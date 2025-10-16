# Install Temurin 21 and configure environment for this repo
# Run this script as Administrator in PowerShell

param(
    [string]$ProjectRoot = 'J:\Project\GetPayInChallenge'
)

$projectGradleProps = Join-Path $ProjectRoot 'gradle.properties'
$tempInstaller = Join-Path $env:TEMP 'temurin21_installer.msi'

function CommandExists([string]$cmd) { return (Get-Command $cmd -ErrorAction SilentlyContinue) -ne $null }

Write-Host "Installing Temurin 21 (winget preferred)..."
if (CommandExists 'winget') {
    winget install --id EclipseAdoptium.Temurin.21.JDK -e --accept-package-agreements --accept-source-agreements
} else {
    Write-Host "winget not found — falling back to Adoptium API download"
    # Use single quotes so PowerShell doesn't treat '&' as an operator
    $apiUrl = 'https://api.adoptium.net/v3/assets/latest/21/hotspot?architecture=x64&os=windows&image_type=jdk'
    $assets = Invoke-RestMethod -Uri $apiUrl -UseBasicParsing
    $pkgLink = $null
    foreach ($a in $assets) {
        foreach ($b in $a.binaries) {
            if ($b.package -and $b.package.link) { $pkgLink = $b.package.link; break }
        }
        if ($pkgLink) { break }
    }
    if (-not $pkgLink) { throw 'No Temurin package link found' }
    Invoke-WebRequest -Uri $pkgLink -OutFile $tempInstaller -UseBasicParsing
    # Use a simple argument array; Start-Process will quote paths as needed
    Start-Process -FilePath 'msiexec.exe' -ArgumentList "/i", "$tempInstaller", "/qn", "/norestart" -Wait
    Remove-Item $tempInstaller -ErrorAction SilentlyContinue
}

Write-Host "Detecting installed JDK..."
$javaHome = $null
try {
    $out = & java -XshowSettings:properties -version 2>&1 | Select-String 'java.home'
    if ($out) { $javaHome = $out.ToString().Split(':',2)[1].Trim() }
} catch { }

if (-not $javaHome) {
    $candidates = @(
        'C:\\Program Files\\Eclipse Adoptium\\jdk-21*',
        'C:\\Program Files\\Temurin\\jdk-21*',
        'C:\\Program Files\\Java\\jdk-21*'
    )
    foreach ($p in $candidates) {
        $m = Get-ChildItem -Path $p -Directory -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($m) { $javaHome = $m.FullName; break }
    }
}

if (-not $javaHome -or -not (Test-Path $javaHome)) { Write-Error "Failed to detect JDK 21 installation"; exit 1 }
Write-Host "Detected JDK: $javaHome"

Write-Host "Setting Machine JAVA_HOME and updating Machine PATH..."
[Environment]::SetEnvironmentVariable('JAVA_HOME',$javaHome,'Machine')
$mp = [Environment]::GetEnvironmentVariable('Path','Machine')
$bin = Join-Path $javaHome 'bin'
if ($mp -notmatch [regex]::Escape($bin)) { [Environment]::SetEnvironmentVariable('Path', ($mp + ';' + $bin), 'Machine') }

Write-Host "Updating project gradle.properties at $projectGradleProps"
$line = 'org.gradle.java.home=' + $javaHome
if (-not (Test-Path $projectGradleProps)) {
    @(
        '# Project-level Gradle properties'
        $line
    ) | Out-File -FilePath $projectGradleProps -Encoding UTF8
} else {
    $content = Get-Content $projectGradleProps
    $pattern = '^org\.gradle\.java\.home\s*='
    if ($content -match $pattern) {
        $content = $content | ForEach-Object { if ($_ -match $pattern) { $line } else { $_ } }
        $content | Set-Content -Path $projectGradleProps -Encoding UTF8
    } else {
        Add-Content -Path $projectGradleProps -Value $line -Encoding UTF8
    }
}

Write-Host "Installation and configuration finished. Open a NEW PowerShell and run:`n  java -version`n  gradlew.bat --version (from android\) to verify."

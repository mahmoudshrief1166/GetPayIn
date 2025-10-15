Upgrade project to Java 21 (LTS)

This guide shows how to install JDK 21 on Windows and configure this project to use it for Gradle builds.

Prerequisites
- Windows (PowerShell)
- Admin privileges to set machine environment variables (recommended)

1) Install a JDK 21 distribution

Official builds are available from Adoptium (Temurin) and other vendors. Pick one and install.

Manual download (recommended):
- https://adoptium.net

PowerShell (example using Adoptium MSI — download manually or with a package manager you trust):
# After downloading and installing JDK 21, note its install path (for example `C:\Program Files\Eclipse Adoptium\jdk-21.0.0`).

2) Set JAVA_HOME and update PATH (PowerShell, run as Administrator)

# Replace the path below with your actual JDK 21 install location
$jdk = 'C:\Program Files\Eclipse Adoptium\jdk-21.0.0'

# Set JAVA_HOME permanently for the machine
[Environment]::SetEnvironmentVariable('JAVA_HOME', $jdk, 'Machine')

# Append the JDK bin to the machine PATH (avoid duplicating if already present)
$oldPath = [Environment]::GetEnvironmentVariable('Path', 'Machine')
if ($oldPath -notmatch [regex]::Escape("$jdk\\bin")) {
    [Environment]::SetEnvironmentVariable('Path', "$oldPath;$jdk\\bin", 'Machine')
}

# Open a new PowerShell after this so the environment is reloaded

3) Verify installation

java -version
# Expected: output showing a Java 21 runtime (e.g., "openjdk version "21" ...")

4) Tell Gradle to use the JDK 21 installation (project-local)

Open `gradle.properties` at the project root and set the `org.gradle.java.home` value to your JDK 21 path. Example:

org.gradle.java.home=C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.0

Notes:
- If `org.gradle.java.home` is blank, Gradle uses the system `JAVA_HOME`.
- For CI, ensure the CI runner has Java 21 installed or configure the runner to set `org.gradle.java.home`.

5) Quick checks in project

# Show Gradle JVM used by the wrapper
.\gradlew --version
# The "JVM" line should point to your Java 21 path.

# Try a build
.\gradlew assembleDebug

6) Additional compatibility notes
- Gradle 9 (the project uses Gradle 9.x per gradle-wrapper.properties) supports running on Java 21.
- Android Gradle Plugin (AGP) must be compatible with Gradle and JDK versions. If you hit build issues related to AGP, check `android/build.gradle` and ensure an appropriate AGP version is configured (e.g., AGP 8.2+ with Gradle 9). Update AGP carefully and run the build.

7) If you want an automated upgrade tool
- I attempted to run the automated Copilot upgrade tool but it is unavailable on this account. You can run such tools if you have access to GitHub Copilot Pro/Enterprise features or use OpenRewrite/other migration tools locally.

If you want, I can:
- Suggest AGP versions matching Gradle 9 and Java 21 and prepare a safe `build.gradle` update.
- Create CI snippets to install Temurin 21 in GitHub Actions.
- Help troubleshoot any build errors after you install JDK 21 and run Gradle.

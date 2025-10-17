Upgrade to Java 21 (LTS) - Notes

This React Native Android project has been prepared to use Java 21 for compilation.

What changed
- Gradle wrapper is set to Gradle 9.0.0 in `android/gradle/wrapper/gradle-wrapper.properties` (compatible with Java 21).
- Android Gradle Plugin (AGP) is set to a compatible version in `android/build.gradle` (agpVersion = "8.4.2").
- `android/app/build.gradle` has been updated to request Java 21 toolchain (source/target compatibility and kotlin jvmTarget = 21).
 - Kotlin configured to use the Java 21 toolchain via `kotlin { jvmToolchain(21) }` to avoid JVM-target mismatches.

Local setup (Windows PowerShell)
1. Install a JDK 21 distribution (Adoptium / Temurin or Eclipse Temurin):
   - Download and install from: https://adoptium.net
2. Set JAVA_HOME to the JDK 21 installation path (PowerShell):

   $env:JAVA_HOME = 'C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.0.XXX'
   [Environment]::SetEnvironmentVariable('JAVA_HOME', $env:JAVA_HOME, 'User')

3. Verify:

   java -version
   javac -version

Build
- From repository root run (PowerShell):

  cd android; .\\gradlew.bat clean assembleDebug

Notes and next steps
- If you use Android Studio, set the JDK used by the IDE to the installed JDK 21.
- If build or plugin issues occur, consider bumping AGP to a newer 8.4.x or 8.5.x and Gradle patch version.
- I couldn't run the automated upgrade tool because the Copilot plan lacks the required access. I prepared manual changes instead.

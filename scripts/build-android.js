const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const environment = { ...process.env };
const windows = process.platform === "win32";
if (windows) {
  const bundledJdk = path.join(process.env.ProgramFiles || "C:/Program Files", "Android/Android Studio/jbr");
  if (!environment.JAVA_HOME && fs.existsSync(path.join(bundledJdk, "bin/java.exe"))) environment.JAVA_HOME = bundledJdk;
  const sdk = path.join(process.env.LOCALAPPDATA || "", "Android/Sdk");
  if (!environment.ANDROID_HOME && fs.existsSync(sdk)) environment.ANDROID_HOME = sdk;
}
function run(command, args, cwd = root) {
  const result = spawnSync(command, args, { cwd, env: environment, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
run(process.execPath, ["scripts/check.js"]);
run(process.execPath, ["node_modules/@capacitor/cli/bin/capacitor", "sync", "android"]);
run(windows ? "cmd.exe" : "./gradlew", windows ? ["/d", "/c", "gradlew.bat", "assembleDebug"] : ["assembleDebug"], path.join(root, "android"));
const output = path.join(root, "artifacts");
fs.mkdirSync(output, { recursive: true });
const version = require("../package.json").version;
const apk = path.join(output, `notas-pucp-${version}-debug.apk`);
fs.copyFileSync(path.join(root, "android/app/build/outputs/apk/debug/app-debug.apk"), apk);
console.log(`APK de prueba: ${apk}`);

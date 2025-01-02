/**
 * This script is used to bump the version of the package.json file.
 * It accepts a -m option to specify whether the script should bump the minor version, otherwise it bumps the patch version.
 */
function main() {
    const { readFileSync, writeFileSync } = require("node:fs");
    const args = process.argv.slice(2);
    const isMinor = args.includes("-m");

    const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
    const oldVersion = packageJson.version;
    const version = packageJson.version.split(".");
    if (isMinor) {
        version[1] = String(Number(version[1]) + 1);
        version[2] = "0";
    } else {
        version[2] = String(Number(version[2]) + 1);
    }
    const newVersion = version.join(".");
    packageJson.version = newVersion;
    writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
    console.log(`Bumped version from ${oldVersion} to ${newVersion}\nchore: Release ${newVersion} :rocket:`);
}

main();

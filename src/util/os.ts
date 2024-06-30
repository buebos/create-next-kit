import { OSGroup } from "../model/OsGroup";

export const OS_LABEL = getCurrentOSLabel();

export function getCurrentOSLabel(): OSGroup {
    switch (process.platform) {
        case "win32": {
            if (
                process.arch === "x64" ||
                process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432")
            ) {
                return "win64";
            }

            return "win32";
        }
        case "darwin":
        case "linux":
            return process.platform;
        default: {
            throw new Error(
                "Could not categorize your OS (win32 | win64 | darwin | linux), therefore tool installation cannot be performed"
            );
        }
    }
}

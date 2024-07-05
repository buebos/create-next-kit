import { Platform } from "../model/data/Source";

export const PLATFORM = getCurrentPlatform();

function getCurrentPlatform(): Platform {
    switch (process.platform) {
        case "win32": {
            if (
                process.arch === "x64" ||
                process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432")
            ) {
                return Platform.WIN64;
            }

            return Platform.WIN32;
        }
        case "darwin":
            return Platform.MACOS;
        case "linux":
            return Platform.LINUX;
        default: {
            throw new Error(
                "Could not categorize your OS (win32 | win64 | darwin | linux), therefore tool installation cannot be performed"
            );
        }
    }
}

type OSGroup = "win32" | "win64" | "darwin" | "linux" | undefined;

export const OS_LABEL = getCurrentOSLabel();

export function getCurrentOSLabel(): OSGroup {
    if (process.platform == "win32") {
    }

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
            return;
        }
    }
}

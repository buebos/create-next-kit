import assert from "assert";
import { PROCESS_SUCESS_STATUS } from "../../../util/constant";
import { PLATFORM } from "../../../util/platform";
import run from "../../../util/process/run";
import { Platform } from "../../../model/Platform";

/**
 * The command provided in the package from NextJS:
 *
 * https://github.com/vercel/next.js/tree/canary/packages/create-next-app
 */
const cmdCreateNextApp = "create-next-app";

/** The command string in windows is different */
const cmdNpm =
    PLATFORM == Platform.WIN32 || PLATFORM == Platform.WIN64
        ? "npx.cmd"
        : "npx";

/**
 * Spawns a child process using the create-next-app package
 * provided by NextJS. This will log a form on terminal to
 * configure the base template of the project.
 *
 * I chose to handle it this way since the create-next-app package
 * doesn't provide any exports for running it and I don't think
 * that cloning and mantaining a copy of the repo is a good idea.
 *
 * But maybe I'm wrong idk.
 *
 * @param projectDir A string containing the base directory for
 * the project to be created.
 * @returns
 */
async function createNextApp(projectDir: string): Promise<void> {
    const status = await run(cmdNpm, [cmdCreateNextApp, projectDir]);

    assert(
        status === PROCESS_SUCESS_STATUS,
        "Create next app failed: " + status
    );
}

export default createNextApp;

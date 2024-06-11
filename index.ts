#!/usr/bin/env node

import { promptBool, promptString } from "./src/util/prompt";

import { spawn } from "child_process";
import { handleError } from "./src/handleError";
import logger from "./src/util/logger";
import type { ConfigCreateNextExtra } from "./src/util/types";

async function main() {
    /** TODO: Fix this to a builder or factory like pattern maybe? */
    const config: ConfigCreateNextExtra = {
        name: await promptString("What's your project name?", "my-app"),
        docker: await promptBool(
            "Would you like to add docker config files?",
            true
        ),
        stripe: await promptBool(
            "Would you like to add Stripe API and CLI?",
            false
        ),
        dbs: ["postgres"],
    };

    logger.checkpoint(`Loading create-next-app for '${config.name}'...`);

    /**
     * Spawns the child process of the create-next-app
     * package. This is useful to not copy nor modify
     * the source code of that package.
     */
    const createNextApp = spawn(
        /** The command string in windows is different */
        /^win/.test(process.platform) ? "npx.cmd" : "npx",
        /** Pass in the package to run */
        ["create-next-app", config.name],
        /** Configure io to link to the current main process */
        { stdio: ["pipe", process.stdout, process.stderr] }
    );

    /**
     * TLDR: This line is needed to clear render correctly.
     *
     * Very important. It seems that the output of create-next-app
     * command needs to write raw bytes to the main process stdin to
     * clear the cli, handle arrow keys etc. It's just my impression
     * when I tested this. Maybe it's because it's using the 'prompts'
     * Nodejs library and that is doing something weird on terminal.
     */
    process.stdin.setRawMode(true);

    /**
     * The child proceess spawned needs to get the stdin of
     * the main terminal receiving user inputs.
     */
    process.stdin.pipe(createNextApp.stdin);

    createNextApp.on("error", () => {
        handleError();
    });
    createNextApp.on("close", (status) => {
        if (status != 0) {
            return handleError();
        }

        logger.checkpoint(`Adding extras to '${config.name}'...`);
    });
}

main();

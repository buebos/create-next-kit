import { spawn } from "child_process";

/**
 * The command provided in the package from NextJS:
 *
 * https://github.com/vercel/next.js/tree/canary/packages/create-next-app
 */
const cmdCreateNextApp = "create-next-app";

/** The command string in windows is different */
const cmdNpm = /^win/.test(process.platform) ? "npx.cmd" : "npx";

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
    return new Promise<void>((resolve, reject) => {
        /**
         * Spawns the child process of the create-next-app
         * package. This is useful to not copy nor modify
         * the external code of that package.
         */
        const createNextApp = spawn(cmdNpm, [cmdCreateNextApp, projectDir], {
            /** Configure IO to link to the current main process */
            stdio: ["pipe", process.stdout, process.stderr],
        });

        /**
         * TLDR: This line is needed to render correctly the prompts from
         * create-next-app process.
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

        createNextApp.on("close", async (status) => {
            if (status != 0) {
                return reject(new Error("Create next app failed: " + status));
            }

            resolve();
        });
    });
}

export default createNextApp;

import { spawn } from "child_process";

type Options = {
    pipe?: boolean;
};

async function run(
    command: string,
    flags: string[],
    options: Options = {
        pipe: true,
    }
): Promise<number | null> {
    return new Promise<number | null>((resolve) => {
        const child = spawn(command, flags, {
            /** Configure IO to link to the current main process */
            stdio: options.pipe
                ? ["pipe", process.stdout, process.stderr]
                : undefined,
        });

        if (options.pipe) {
            /**
             * TLDR: This line is needed to render correctly the prompts from
             * the child process spawned process.
             *
             * Very important. It seems that the output of child process
             * command needs to write raw bytes to the main process stdin to
             * clear the cli, handle arrow keys etc. It's just my impression
             * when I tested this. Maybe it's because it's because the process
             * that I'm testing with (create-next-app) is using the 'prompts'
             * NodeJS library and that is doing something weird on terminal idk.
             * Might check later lol.
             */
            process.stdin.setRawMode(true);

            /**
             * The child proceess spawned needs to get the stdin of
             * the main terminal receiving user inputs. Asserts not
             * null to avoid typescript warn.
             */
            process.stdin.pipe(child.stdin!);
        }

        child.on("close", (status) => {
            resolve(status);
        });
    });
}

export default run;

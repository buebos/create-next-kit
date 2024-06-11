import prompts from "prompts";

function onState(state: { aborted: boolean }) {
    if (!state.aborted) {
        return;
    }

    // If we don't re-enable the terminal cursor before exiting
    // the program, the cursor will remain hidden
    process.stdout.write("\x1B[?25h");

    process.stdout.write("\n");
    process.exit(1);
}

export async function promptBool(
    message: string,
    initial: boolean
): Promise<boolean> {
    const input = await prompts({
        name: "result",
        type: "toggle",
        active: "Yes",
        inactive: "No",
        onState,
        message,
        initial,
        validate: (value) => {
            return typeof value === "boolean";
        },
    });

    return input.result;
}

export async function promptString(
    message: string,
    initial?: string
): Promise<string> {
    const input = await prompts({
        name: "result",
        type: "text",
        onState,
        message,
        initial,
        validate: (value) => {
            return typeof value === "string";
        },
    });

    return input.result;
}

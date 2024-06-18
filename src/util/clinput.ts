import prompts from "prompts";

const promptsLibTypeMap = {
    string: "text",
    boolean: "toggle",
    multiselect: "multiselect",
} as const;

function handleAbort(promptState: { aborted: boolean }) {
    if (!promptState.aborted) {
        return;
    }

    process.stdout.write("\x1B[?25h");

    process.stdout.write("\n");
    process.exit(1);
}

/**
 * A minimal wrapper around the prompts API.
 *
 * @returns The parsed response from the user.
 */
export async function clinput<T extends CreateNextStack.Prompt.Types>(
    config: CreateNextStack.Prompt.Config<T>
): Promise<CreateNextStack.Prompt.TypeMap[T]["returns"]> {
    const prompt: prompts.PromptObject<"res"> = {
        name: "res",
        type: promptsLibTypeMap[config.type],
        onState: handleAbort,
        message: config.message,
        validate: config.validator,
    };

    if (config.type == "boolean") {
        prompt.active = "Yes";
        prompt.inactive = "No";
    }

    if (config.type !== "multiselect") {
        prompt.initial = config.fallback;
    }

    if (config.type == "multiselect") {
        prompt.choices = config.choices;
    }

    const input = await prompts(prompt);

    return input.res;
}

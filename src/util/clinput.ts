import prompts from "prompts";

type PromptType = "string" | "boolean" | "multiselect";

type PromptTypeMap = {
    string: {
        return: string;
        fallback: string;
    };
    boolean: {
        return: boolean;
        fallback: boolean;
    };
    multiselect: {
        return: { title: string; value: string }[];
        fallback: never;
    };
};

type ClinputConfig<T extends PromptType> = T extends "multiselect"
    ? {
          type: T;
          message: string;
          choices?: { title: string; value: string }[];
      }
    : {
          type: T;
          message: string;
          fallback: PromptTypeMap[T]["fallback"];
      };

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
async function clinput<T extends PromptType>(
    config: ClinputConfig<T>
): Promise<PromptTypeMap[T]["return"]> {
    const prompt: prompts.PromptObject<"res"> = {
        name: "res",
        type: promptsLibTypeMap[config.type],
        onState: handleAbort,
        message: config.message,
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

export default clinput;

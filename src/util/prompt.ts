import prompts from "prompts";

type Types = "string" | "boolean" | "multiselect";

type TypeMap = {
    string: {
        returns: string;
        fallback: string;
    };
    boolean: {
        returns: boolean;
        fallback: boolean;
    };
    multiselect: {
        returns: string[];
        fallback: never;
    };
};

type Config<T extends Types> = (T extends "multiselect"
    ? {
          type: T;
          message: string;
          choices?: { title: string; value: string }[];
      }
    : {
          type: T;
          message: string;
          fallback: TypeMap[T]["fallback"];
      }) & {
    validator?: (input: unknown) => boolean;
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
export async function prompt<T extends Types>(
    config: Config<T>
): Promise<TypeMap[T]["returns"]> {
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

export default prompt;

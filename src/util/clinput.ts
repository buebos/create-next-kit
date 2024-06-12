import prompts from "prompts";
import { getTechOptions } from "../util/core";

type ClinputConfig<T extends CreateNextStack.Prompt.Types> =
    T extends "multiselect"
        ? {
              type: T;
              message: string;
              choices?: { title: string; value: string }[];
          }
        : {
              type: T;
              message: string;
              fallback: CreateNextStack.Prompt.TypeMap[T]["fallback"];
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
export async function clinput<T extends CreateNextStack.Prompt.Types>(
    config: ClinputConfig<T>
): Promise<CreateNextStack.Prompt.TypeMap[T]["returns"]> {
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

export async function clinputChoices<
    T extends keyof Required<CreateNextStack.TechCategory>
>(groupKey: T) {
    const res: Required<CreateNextStack.TechCategory>[T] = {};

    const techs = await clinput({
        type: "multiselect",
        message:
            "What " + groupKey.toUpperCase() + "s" + " do you want to include?",
        choices: getTechOptions(groupKey),
    });

    for (const tech of techs) {
        /** Dunno why but i had to do this to avoid type error */
        (res[tech as keyof typeof res] as any) = true;
    }

    return res;
}

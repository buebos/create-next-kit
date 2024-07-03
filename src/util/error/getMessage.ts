import errors from "./errors";

type Options = {
    params?: string[];
    /**
     * The
     */
    level?: "dev" | "user_input";
};

function getMessage(id: keyof typeof errors, options?: Options) {
    if (!(id in errors)) {
        return (
            "Unknown error id: " + id + ". This is a dev error; please report."
        );
    }

    let message = errors[id].join("\n");

    if (options?.params) {
        for (const index in options.params) {
            message.replace(new RegExp(`${index}`, "g"), options.params[index]);
        }
    }

    switch (options?.level) {
        case "dev":
            message += "\n\n" + "This is a dev error; please report.";

            break;
        case "user_input":
        default:
            break;
    }

    return message;
}

export default getMessage;

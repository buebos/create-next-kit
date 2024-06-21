import { bold, green, white, red, yellow } from "picocolors";

const logger = {
    line() {
        process.stdout.write("\n");

        return this;
    },
    checkmark(...messages: unknown[]) {
        process.stdout.write(
            bold(green("√")) +
                " " +
                bold(green(messages.map((msg) => String(msg)).join(" ")))
        );

        this.line();

        return this;
    },
    warn(...messages: unknown[]) {
        process.stdout.write(
            bold(yellow("!")) +
                " " +
                bold(yellow(messages.map((msg) => String(msg)).join(" ")))
        );

        this.line();

        return this;
    },
    error(e: unknown) {
        const prefix = bold(red("x")) + " ";
        let message = "An unexpected error ocurred";

        switch (typeof e) {
            case "string": {
                break;
            }
            case "object": {
                if (!e) {
                    break;
                }

                if (!("message" in e)) {
                    break;
                }

                if (typeof e.message !== "string") {
                    message = String(e.message);
                } else {
                    message = e.message;
                }
            }
            default:
                break;
        }

        process.stdout.write(prefix + message);

        this.line();

        return this;
    },

    loading(message: string) {
        const characters = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
        const cursorEsc = {
            hide: "\u001B[?25l",
            show: "\u001B[?25h",
        };
        process.stdout.write(cursorEsc.hide);

        let i = 0;
        const timer = setInterval(function () {
            process.stdout.write(
                "\r" + characters[i++] + " " + bold(white(message))
            );
            i = i >= characters.length ? 0 : i;
        }, 150);

        this.loadFinished = (
            finishMessage?: string,
            status: "success" | "error" = "success"
        ) => {
            clearInterval(timer);

            process.stdout.write("\r");

            /**
             * I grabbed this code from stackoverflow. I don't know what
             * the following line did but it leaves the loading message
             * after the loadingFinished message so I commented it out o.o.
             */
            // process.stdout.write(cursorEsc.show);

            if (status == "success") {
                this.checkmark(finishMessage ?? message);
            } else {
                this.error(finishMessage ?? message);
            }

            this.loadFinished = (
                _message?: string,
                _status: "success" | "error" = "success"
            ) => {
                return this;
            };

            return this;
        };

        return this;
    },
    loadFinished(
        _message?: string,
        _status: "success" | "error" = "success"
    ) {
        return this;
    },
};

export default logger;

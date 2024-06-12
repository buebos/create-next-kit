import { bold, green, white } from "picocolors";

const logger = {
    line() {
        console.log();

        return this;
    },
    checkpoint(...messages: unknown[]) {
        console.log(
            bold(green("√")),
            bold(green(messages.map((msg) => String(msg)).join(" ")))
        );

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

        this.loadingFinished = (finishMessage?: string) => {
            clearInterval(timer);

            process.stdout.write("\r");

            /**
             * I grabbed this code from stackoverflow. I don't know what
             * the following line did but it leaves the loading message
             * after the loadingFinished message so I commented it out o.o.
             */
            // process.stdout.write(cursorEsc.show);

            this.checkpoint(finishMessage ?? message);
            this.loadingFinished = (_message?: string) => {
                return this;
            };

            return this;
        };

        return this;
    },
    loadingFinished(_message?: string) {
        return this;
    },
};

export default logger;

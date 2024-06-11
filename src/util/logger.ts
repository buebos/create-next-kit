import { bold, green, white } from "picocolors";

const logger = {
    checkpoint(...message: unknown[]) {
        console.log(
            "\n" + bold(green("√")),
            bold(green(message.map((i) => i.toString()).join(" "))),
            "\n"
        );
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

        this.loadingFinished = () => {
            clearInterval(timer);
            process.stdout.write("\r");
            process.stdout.write(cursorEsc.show);
            this.checkpoint(message);
            this.loadingFinished = () => {};
        };
    },
    loadingFinished() {},
};

export default logger;

import createNextKit from "./src/command/create-next-kit/main";
import help from "./src/command/help";

async function main() {
    /**
     * TODO: Handle this logic properly lol.
     */
    if (process.argv.some((arg) => arg == "-h" || arg == "--help")) {
        return help();
    }

    await createNextKit();
}

main();

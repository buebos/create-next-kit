import { App } from "../../model/App";
import writeComposeFile from "../../service/docker/writeComposeFile";
import logger from "../../util/logger";
import createNextApp from "./task/createNextApp";
import promptAppForm from "./task/promptAppForm";

async function main() {
    try {
        const app: App = {
            project: {
                dir: "my-app",
                name: "my-app",
            },
            tools: [],
        };

        /**
         * This will trigger some prompts on the terminal
         * to config the app based on the tools registered
         * on the data folder in the root dir of this repo.
         * It will also modify the app struct to match for the
         * tools.
         */
        await promptAppForm(app);

        logger
            .line()
            .checkmark(
                `Loading create-next-app for '${app.project.name}', please wait a sec...`
            )
            .line();

        await createNextApp(app.project.dir);

        switch (app.container_strategy) {
            case "docker":
                await writeComposeFile({
                    dir: app.project.dir,
                    name: app.project.name,
                    tools: app.tools,
                });
            default:
                break;
        }
    } catch (e) {
        logger.error(e);
    }
}

export default main;

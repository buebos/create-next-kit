import { App } from "../../model/App";
import logger from "../../util/logger";
import createNextApp from "./task/createNextApp";
import promptToolsForm from "./task/promptToolsForm";
import setupAppTools from "./task/setupAppTools";

async function main() {
    try {
        const app: App = {
            project: {
                dir: "my-app",
                name: "my-app",
            },
            external_strategy: "download",
            tools: [],
        };

        /**
         * This will trigger some prompts on the terminal
         * to config the app based on the tools registered
         * on the data folder in the root dir of this repo.
         * It will also modify the app struct to match for the
         * tools.
         */
        await promptToolsForm(app);

        logger
            .line()
            .checkmark(
                `Loading create-next-app for '${app.project.name}', please wait a sec...`
            )
            .line();

        await createNextApp(app.project.dir);

        await setupAppTools(app);
    } catch (e) {
        logger.error(e);
    }
}

export default main;

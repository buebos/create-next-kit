import handleDockerSetup from "./docker/handleDockerSetup";
import logger from "./util/logger";

async function setupTools(app: CreateNextStack.App) {
    try {
        logger.loading(`Creating tech stack for '${app.project.dir}'...`);

        switch (app.external_source_strategy) {
            case "docker": {
                await handleDockerSetup(app);
            }
            case "url": {
                throw new Error("Unimplemented");
            }
            default:
                break;
        }

        logger.loadingFinished(
            `NextJS app '${app.project.dir}' with tech stack created.`
        );
    } catch (e) {
        logger.loadingFinished();

        logger.error(e);
    }
}

export default setupTools;

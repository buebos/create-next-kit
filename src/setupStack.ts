import logger from "./util/logger";

export async function setupStack(config: CreateNextStack.Config) {
    try {
        logger.loading(`Creating tech stack for '${config.name}'...`);

        if (config.categories.container?.docker) {
        }

        logger.loadingFinished(
            `NextJS app '${config.name}' with tech stack created`
        );
    } catch (e) {
        logger.loadingFinished();
    }
}

import logger from "./util/logger";
import { handleDockerSetup } from "./docker/handleDockerSetup";

export async function setupStack(ctx: CreateNextStack.Context) {
    try {
        logger.loading(`Creating tech stack for '${ctx.name}'...`);

        if (ctx.external_source_strategy == "docker") {
            await handleDockerSetup(ctx);
        }

        logger.loadingFinished(
            `NextJS app '${ctx.name}' with tech stack created`
        );
    } catch (e) {
        logger.loadingFinished();
        logger.error(e);
    }
}

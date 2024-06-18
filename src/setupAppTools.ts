import setupDocker from "./docker/setup";

async function setupAppTools(app: CreateNextStack.App) {
    switch (app.external_source_strategy) {
        case "docker": {
            await setupDocker(app);
        }
        case "url": {
            throw new Error("Unimplemented external source strategy for url");
        }
        default:
            break;
    }
}

export default setupAppTools;

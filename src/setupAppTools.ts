import setupDocker from "./docker/setup";

async function setupAppTools(app: CreateNextStack.App) {
    switch (app.external_source_strategy) {
        case "docker": {
            await setupDocker(app);
            break;
        }
        case "url":
        default:
            throw new Error("Unimplemented external source strategy");
    }
}

export default setupAppTools;

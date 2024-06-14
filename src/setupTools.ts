import handleDockerSetup from "./docker/handleDockerSetup";

async function setupTools(app: CreateNextStack.App) {
    switch (app.external_source_strategy) {
        case "docker": {
            await handleDockerSetup(app);
        }
        case "url": {
            throw new Error("Unimplemented external source strategy for url");
        }
        default:
            break;
    }
}

export default setupTools;

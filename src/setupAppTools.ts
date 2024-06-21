import setupDocker from "./docker/setup";

async function setupAppTools(app: CreateNextStack.App) {
    

    switch (app.container_strategy) {
        case "docker": {
            await setupDocker(app);
            break;
        }
        default:
            throw new Error("Unimplemented external source strategy");
    }
}

export default setupAppTools;

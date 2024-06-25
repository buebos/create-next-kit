import { App } from "../../../model/App";
import writeComposeFile from "../../../service/docker/writeComposeFile";

async function setupAppTools(app: App) {
    switch (app.container_strategy) {
        case "docker": {
            await writeComposeFile(app);
            break;
        }
        default:
            throw new Error("Unimplemented external source strategy");
    }
}

export default setupAppTools;

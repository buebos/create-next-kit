import path from "path";
import getExternalSource from "./getExternalSource";

const SCRIPT_DIR = "script";

async function writeDownloadScript(
    app: CreateNextStack.App,
    tool: CreateNextStack.Tool
) {
    const source = getExternalSource(tool);
    const scriptPath = path.join(app.project.dir, SCRIPT_DIR, tool.group);
}

export default writeDownloadScript;

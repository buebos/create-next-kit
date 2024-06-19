import path from "path";
import getSource from "./getSource";

const SCRIPT_DIR = "script";

async function writeDownloadScript(
    app: CreateNextStack.App,
    tool: CreateNextStack.Tool
) {
    const source = getSource(tool);
    const scriptPath = path.join(app.project.dir, SCRIPT_DIR, tool.group);
}

export default writeDownloadScript;

import path from "path";
import getToolSource from "../util/getToolSource";

const SCRIPT_DIR = "script";

async function writeDownloadScript(
    app: CreateNextStack.App,
    tool: CreateNextStack.Tool
) {
    const source = getToolSource(tool);
    const scriptPath = path.join(app.project.dir, SCRIPT_DIR, tool.group);
}

export default writeDownloadScript;

import path from "path";

const SCRIPT_DIR = "script";

async function writeDownloadExternalToolScript(tool: CreateNextStack.Tool) {}

export function getScriptPath(
    app: CreateNextStack.App,
    tool: CreateNextStack.Tool
) {
    return path.join(app.project.dir, SCRIPT_DIR, tool.group);
}

export default writeDownloadExternalToolScript;

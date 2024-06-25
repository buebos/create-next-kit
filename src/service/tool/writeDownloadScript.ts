import path from "path";
import { App } from "../../model/App";
import { Tool } from "../../model/Tool";
import getExternalSource from "./getExternalSource";

const SCRIPT_DIR = "script";

async function writeDownloadScript(app: App, tool: Tool) {
    const external = getExternalSource(tool);
    const scriptPath = path.join(app.project.dir, SCRIPT_DIR, tool.group);
}

export default writeDownloadScript;

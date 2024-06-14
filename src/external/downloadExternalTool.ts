import { unlink } from "fs/promises";
import path from "path";
import sources from "../../data/tool_external_source.json";
import download from "../util/file/download";
import unzip from "../util/file/unzip";
import logger from "../util/logger";
import { OS_LABEL } from "../util/os";
import getToolSource from "../util/getToolSource";

const EXTERNAL_TOOLS_DIR = "resource";

async function downloadExternalTool(
    app: CreateNextStack.App,
    tool: CreateNextStack.Tool
) {
    if (!OS_LABEL) {
        throw new Error(
            `Could not download external tool since your OS (${process.platform}) does not matches any of the supported platforms.`
        );
    }

    const source = getToolSource(tool);

    if (!source) {
        throw new Error(
            `No available sources registered for: ${tool.label} on the current OS: ${OS_LABEL}.`
        );
    }

    const dir = getExternalToolPath(app, tool);
    const filename = path.join(tool.id + "." + source.file_extension);

    logger.loading("Downloading " + tool.label + " from " + source.url);

    await download(source.url, dir, filename);

    logger.loadingFinished("Downloaded " + tool.label + " from " + source.url);

    switch (source.file_extension) {
        case "zip": {
            const filedir = path.join(dir, filename);

            await unzip(filedir, dir);
            await unlink(filedir);
        }
        case "msi": {
        }
        default:
            break;
    }
}

export function getExternalToolPath(
    app: CreateNextStack.App,
    tool: CreateNextStack.Tool
) {
    return path.join(app.project.dir, EXTERNAL_TOOLS_DIR, tool.group);
}

export default downloadExternalTool;

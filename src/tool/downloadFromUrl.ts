import { unlink } from "fs/promises";
import path from "path";
import downloadFile from "../util/file/download";
import unzip from "../util/file/unzip";
import logger from "../util/logger";
import { OS_LABEL } from "../util/os";
import getSource from "./getSource";

const EXTERNAL_TOOLS_DIR = "resource";

async function downloadFromUrl(
    app: CreateNextStack.App,
    tool: CreateNextStack.Tool
) {
    if (!OS_LABEL) {
        throw new Error(
            `Could not download external tool since your OS (${process.platform}) does not matches any of the supported platforms.`
        );
    }

    const source = getSource(tool);

    if (!source) {
        throw new Error(
            `No available sources registered for: ${tool.label} on the current OS: ${OS_LABEL}.`
        );
    }

    const dir = getExternalToolPath(app, tool);
    const filename = path.join(tool.id + "." + source.file_extension);

    logger.loading("Downloading " + tool.label + " from " + source.url);

    await downloadFile(source.url, dir, filename);

    logger.loadingFinished("Downloaded " + tool.label + " from " + source.url);

    switch (source.file_extension) {
        case "zip": {
            logger.loading("Unzipping " + tool.label + "...");

            const filedir = path.join(dir, filename);

            await unzip(filedir, dir);
            await unlink(filedir);

            logger.loadingFinished("Unzipped " + tool.label);
        }
        case "msi": {
        }
        default:
            break;
    }
}

function getExternalToolPath(
    app: CreateNextStack.App,
    tool: CreateNextStack.Tool
) {
    return path.join(app.project.dir, EXTERNAL_TOOLS_DIR, tool.group);
}

export default downloadFromUrl;

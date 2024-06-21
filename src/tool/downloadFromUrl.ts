import { mkdir, unlink } from "fs/promises";
import path from "path";
import downloadFile from "../util/file/download";
import unzip from "../util/file/unzip";
import logger from "../util/logger";

type FileDest = {
    dir: string;
    filename: string;
};

async function downloadFromExternalSource(
    tool: CreateNextStack.Tool,
    source: CreateNextStack.ToolExternalSource,
    dest: FileDest
) {
    const filepath = path.join(dest.dir, dest.filename);

    await mkdir(dest.dir, { recursive: true });

    logger.loading("Downloading " + tool.label + " from " + source.url);

    await downloadFile(source.url, filepath);

    logger.loadFinished("Downloaded " + tool.label + " from " + source.url);

    switch (source.file_extension) {
        case "zip": {
            logger.loading("Unzipping " + tool.label + "...");

            await unzip(filepath, dest.dir);
            await unlink(filepath);

            logger.loadFinished("Unzipped " + tool.label);
        }
        case "msi": {
        }
        default:
            break;
    }
}

export default downloadFromExternalSource;

import { mkdir, unlink } from "fs/promises";
import path from "path";
import { External } from "../../model/External";
import { Tool } from "../../model/Tool";
import downloadFile from "../../util/file/download";
import unzip from "../../util/file/unzip";
import logger from "../../util/logger";

type FileDest = {
    dir: string;
    filename: string;
};

async function downloadFromExternalSource(
    tool: Tool,
    external: External,
    dest: FileDest
) {
    const filepath = path.join(dest.dir, dest.filename);

    await mkdir(dest.dir, { recursive: true });

    logger.loading("Downloading " + tool.label + " from " + external.url);

    await downloadFile(external.url, filepath);

    logger.loadFinished("Downloaded " + tool.label + " from " + external.url);

    switch (external.file_extension) {
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

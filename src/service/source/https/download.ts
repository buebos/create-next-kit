import { mkdir, unlink } from "fs/promises";
import path from "path";
import { Source } from "../../../model/Source";
import assert from "../../../util/error/assert";
import fileDownload from "../../../util/file/download";
import unzip from "../../../util/file/unzip";
import logger from "../../../util/logger";

async function download(source: Source, toolID: string, dir: string) {
    assert(source.download.type == "https", {
        error: "source.https.download.wrong_type",
        message: { level: "dev", params: [toolID] },
    });

    /** Shortcut */
    const download = source.download.details;

    /** Needed to open a write stream and run the mkdir. */
    const filename = toolID + "." + download.extension;
    const filepath = path.join(dir, filename);

    /** In case the dir isn't created. */
    await mkdir(dir, { recursive: true });

    /** Actual download with messages. */
    logger.loading("Downloading " + toolID + " from " + download.url);
    await fileDownload(download.url, filepath);
    logger.loadFinished("Downloaded " + toolID + " from " + download.url);

    /** Handle depackaging or other post-process. */
    switch (download.extension) {
        case "zip": {
            logger.loading("Unzipping " + toolID + "...");

            await unzip(filepath, dir);
            await unlink(filepath);

            logger.loadFinished("Unzipped " + toolID);

            break;
        }
        default:
            logger.warn(
                `'${download.extension}' not recognized for post-download process.`,
                `\nIf ${toolID} should be installed as-is, ignore.`,
                "Otherwise, check."
            );

            break;
    }
}

export default download;

import { Source } from "../../../model/data/Source";
import { PROCESS_SUCESS_STATUS } from "../../../util/constant";
import assert from "../../../util/error/assert";
import fail from "../../../util/error/fail";
import run from "../../../util/process/run";
import { addImage } from "../../docker/addImage";
import getInstallFlags from "./getInstallFlags";

async function download(source: Source, toolID: string, dir: string) {
    assert(source.download.type == "manager", {
        error: "source.manager.download.type",
        message: { level: "dev", params: [toolID] },
    });

    /** For shortcut */
    const download = source.download.details;

    switch (download.manager_id) {
        case "docker": {
            for await (const imageID of download.packages) {
                await addImage({ id: imageID, name: toolID }, dir);
            }

            break;
        }
        default: {
            const flags = await getInstallFlags(
                source,
                download.manager_id,
                dir
            );

            const status = await run(download.manager_id, flags);

            if (status != PROCESS_SUCESS_STATUS) {
                fail("source.manager.download", {
                    params: [toolID, download.manager_id],
                });
            }

            break;
        }
    }
}

export default download;

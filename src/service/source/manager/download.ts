import { Source } from "../../../model/Source";
import { PROCESS_SUCESS_STATUS } from "../../../util/constant";
import assert from "../../../util/error/assert";
import fail from "../../../util/error/fail";
import run from "../../../util/process/run";
import { addImage } from "../../docker/addImage";
import getInstallFlags from "./getInstallFlags";

async function download(source: Source, toolID: string, dir: string) {
    assert(source.download.type == "manager", "source.manager.download.type", {
        deverr: true,
        params: [toolID],
    });

    /** For shortcut */
    const managerID = source.download.details.manager_id;

    switch (managerID) {
        case "docker": {
            await addImage(
                { id: source.download.details.packages[0], name: toolID },
                dir
            );

            break;
        }
        default: {
            const flags = await getInstallFlags(source, managerID, dir);
            const status = await run(managerID, flags);

            if (status != PROCESS_SUCESS_STATUS) {
                fail("source.manager.download", {
                    params: [toolID, managerID],
                });
            }

            break;
        }
    }
}

export default download;

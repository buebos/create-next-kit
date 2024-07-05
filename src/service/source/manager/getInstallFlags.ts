import { Source } from "../../../model/data/Source";
import { MANAGER_CMD_DEFAULT_INSTALL } from "../../../util/constant";
import assert from "../../../util/error/assert";
import fail from "../../../util/error/fail";
import logger from "../../../util/logger";
import getManagerByID from "../../manager/getByID";

async function getFlags(
    source: Source,
    managerID: string,
    dir: string
): Promise<string[]> {
    assert(source.download.type == "manager", {
        error: "source.manager.getInstallFlags.source",
        message: { level: "dev" },
    });

    const manager = await getManagerByID(managerID);
    const download = source.download.details;

    if (!manager) {
        fail("source.manager.getInstallFlags.match", {
            level: "dev",
            params: [managerID],
        });
    }

    const flags: string[] = [];

    /**
     * All managers should have a install command which is commonly just
     * "install". This is just in case the manager has an specific way
     * of installing.
     */
    flags.push(
        manager.command?.install
            ? manager.command.install
            : MANAGER_CMD_DEFAULT_INSTALL
    );

    /**
     * Any specific flags needed for downloading from that source.
     */
    if (download.flags) {
        for (const flag of download.flags) {
            flags.push(flag);
        }
    }

    /**
     * First check if the specific source has a way of downloading to a dir.
     * Otherwise check if the packagemanager has a way of setting this dir.
     * Finally if there is no way of setting that install it globally.
     */
    if (download.command?.target_dir_flag) {
        flags.push(download.command.target_dir_flag);
        flags.push(dir);
    } else if (typeof manager.command?.target_dir_flag == "string") {
        flags.push(manager.command?.target_dir_flag);
        flags.push(dir);
    } else {
        logger.warn(
            `This tool: ${source.tool_id} will be downloaded globally using this manager: ${manager.id}`
        );
    }

    /**
     * Download all packages related or needed for that tool.
     */
    for (const pkg of download.packages) {
        flags.push(pkg);
    }

    return flags;
}

export default getFlags;

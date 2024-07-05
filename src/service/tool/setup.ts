import { Manager } from "../../model/data/Manager";
import { Tool } from "../../model/data/Tool";
import fail from "../../util/error/fail";
import logger from "../../util/logger";
import Download from "../source/Download";
import getSourcesByToolID from "../source/getSourcesByToolID";

async function setup(tool: Tool, managers: Manager[], dir: string) {
    const managerIDs = managers.map((m) => m.id);

    const sources = (await getSourcesByToolID(tool.id)).filter((source) => {
        return (
            source.download.type != "manager" ||
            managerIDs.includes(source.download.details.manager_id)
        );
    });

    if (!sources.length) {
        fail("tool.setup.no_sources", {
            params: [tool.id, managerIDs.join(", ")],
        });
    }

    for (const source of sources) {
        try {
            await Download[source.download.type](source, tool.id, dir);

            break;
        } catch {
            logger.warn();
        }
    }
}

export default setup;

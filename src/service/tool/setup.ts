import { Manager } from "../../model/Manager";
import { Tool } from "../../model/Tool";
import fail from "../../util/error/fail";
import download from "../source/download";
import getSourcesByToolID from "../source/getSourcesByToolID";

async function setup(tool: Tool, managers: Manager[], dir: string) {
    const managerIDs = managers.map((m) => m.id);
    const sourcesAllForTool = await getSourcesByToolID(tool.id);

    const sources = sourcesAllForTool.filter((source) => {
        return (
            source.download.type != "manager" ||
            managerIDs.includes(source.download.details.manager_id)
        );
    });

    if (!sources.length) {
        fail("tool.setup.sources_length", {
            params: [tool.id, managerIDs.join(", ")],
        });
    }

    for (const source of sources) {
        if (!(source.download.type in download)) {
            fail("tool.setup.no_type", {
                deverr: true,
                params: [source.download.type],
            });
        }

        try {
            await download[source.download.type](source, tool.id, dir);

            break;
        } catch {}
    }
}

export default setup;

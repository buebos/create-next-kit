import { Source } from "../../model/data/Source";
import assert from "../../util/error/assert";
import { PLATFORM } from "../../util/platform";
import getSourcesPlatform from "./getSourcesPlatform";

let cache: { [toolID: string]: Source[] } = {};

async function getSourcesByToolID(toolID: string): Promise<Source[]> {
    if (cache[toolID]) {
        return cache[toolID];
    }

    const sources = await getSourcesPlatform();

    assert(sources.length, {
        error: "source.getByTool.no_available",
        message: { params: [PLATFORM, toolID] },
    });

    const toolSources = sources.filter((source) => {
        return source.tool_id == toolID;
    });

    cache[toolID] = toolSources;

    return toolSources;
}

export default getSourcesByToolID;

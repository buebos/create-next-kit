import { External } from "../../model/External";
import { Tool } from "../../model/Tool";
import { OS_LABEL } from "../../util/os";
import getExternals from "../external/getExternals";

async function getExternalSource(tool: Tool) {
    const externals = await getExternals();

    return externals.find((external) => {
        return (
            external.tool_id === tool.id &&
            /** Dunno why but typescript yields for undefined if not casted lol */
            external.os_groups.includes(OS_LABEL)
        );
    }) as External | undefined;
}

export default getExternalSource;

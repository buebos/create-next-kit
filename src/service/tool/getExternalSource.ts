import externals from "../../../data/external.json";
import { Tool } from "../../model/Tool";
import { OS_LABEL } from "../../util/os";

function getExternalSource(tool: Tool) {
    return externals.find((external) => {
        return (
            external.tool_id === tool.id &&
            /** Dunno why but typescript yields for undefined if not casted lol */
            external.platforms.includes(OS_LABEL)
        );
    });
}

export default getExternalSource;

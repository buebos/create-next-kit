import tools from "../../../data/tool.json";
import { Tool } from "../../model/data/Tool";

async function getTools(): Promise<Tool[]> {
    return tools as Tool[];
}

export default getTools;

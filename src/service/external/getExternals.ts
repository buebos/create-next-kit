import externals from "../../../data/external.json";
import { External } from "../../model/External";

async function getExternals(): Promise<External[]> {
    return externals as External[];
}

export default getExternals;

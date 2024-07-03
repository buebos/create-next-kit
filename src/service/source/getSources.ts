import sources from "../../../data/source.json";
import { Source } from "../../model/Source";

async function getSources(): Promise<Source[]> {
    return sources as Source[];
}

export default getSources;

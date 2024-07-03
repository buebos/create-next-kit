import sourcesAll from "../../../data/source.json";
import { Source } from "../../model/Source";
import { PLATFORM } from "../../util/platform";

let cache: Source[] | null = null;

async function getSourcesPlatform(): Promise<Source[]> {
    if (Array.isArray(cache)) {
        return cache;
    }

    const sourcesPlatform = sourcesAll.filter((source) => {
        return !source.platforms || source.platforms.includes(PLATFORM);
    }) as Source[];

    cache = sourcesPlatform;

    return sourcesPlatform;
}

export default getSourcesPlatform;

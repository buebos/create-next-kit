import groups from "../../../data/group.json";
import { Group } from "../../model/Group";

async function getGroups(): Promise<Group[]> {
    return groups as Group[];
}

export default getGroups;

import managers from "../../../data/manager.json";
import { Manager } from "../../model/data/Manager";

async function getManagers(): Promise<Manager[]> {
    return managers;
}

export default getManagers;

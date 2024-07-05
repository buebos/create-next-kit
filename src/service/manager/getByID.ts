import { Manager } from "../../model/data/Manager";
import getManagers from "./getManagers";

async function getByID(id: string): Promise<Manager | undefined> {
    const managers = await getManagers();

    return managers.find((manager) => {
        return manager.id == id;
    });
}

export default getByID;

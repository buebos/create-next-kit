import { Manager } from "../../model/data/Manager";
import {
    MANAGER_CMD_DEFAULT_VERSION,
    PROCESS_SUCESS_STATUS,
} from "../../util/constant";
import run from "../../util/process/run";
import getManagers from "./getManagers";

async function getHostManagers(): Promise<Manager[]> {
    const managers = await getManagers();
    const managersHost: Manager[] = [];

    for await (const manager of managers) {
        try {
            const status = await run(
                manager.id,
                [manager.command?.version ?? MANAGER_CMD_DEFAULT_VERSION],
                { pipe: false }
            );

            if (status == PROCESS_SUCESS_STATUS) {
                managersHost.push(manager);
            }
        } catch {}
    }

    return managersHost;
}

export default getHostManagers;

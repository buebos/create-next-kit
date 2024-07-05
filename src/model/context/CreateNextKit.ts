import { Manager } from "../data/Manager";
import { Tool } from "../data/Tool";

export type AppContainerStrat = "docker" | null;

export type App = {
    project: { dir: string; name: string };
    managers: Manager[];
    tools: Tool[];
};

import { Tool } from "./Tool";

export type App = {
    project: {
        dir: string;
        name: string;
    };

    tools: Tool[];

    external_strategy: "write_script" | "download";

    container_strategy?: "docker";
};

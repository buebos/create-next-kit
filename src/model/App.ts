import { Container } from "./Container";
import { Tool } from "./Tool";

export type App = {
    project: {
        dir: string;
        name: string;
    };
    tools: Tool[];
    container_strategy: Container;
};

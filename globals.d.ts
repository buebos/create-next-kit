namespace CreateNextStack {
    type Group = {
        id: string;
        label: string;
    };

    type Tool = {
        id: string;
        label: string;
        group: string;
        source_type: "npm" | "external" | "manual";
        docker_image_id?: string;
        npm_package_id?: string;
    };

    type ToolExternalSource = {
        tool_id: string;
        platforms: string[];
        file_extension: string;
        url: string;
    };

    type App = {
        project: {
            dir: string;
            name: string;
        };

        tools: Tool[];

        external_strategy: "write_script" | "download";

        container_strategy?: "docker";
    };

    namespace Prompt {
        type Types = "string" | "boolean" | "multiselect";

        type TypeMap = {
            string: {
                returns: string;
                fallback: string;
            };
            boolean: {
                returns: boolean;
                fallback: boolean;
            };
            multiselect: {
                returns: string[];
                fallback: never;
            };
        };

        type Config<T extends Types> = (T extends "multiselect"
            ? {
                  type: T;
                  message: string;
                  choices?: { title: string; value: string }[];
              }
            : {
                  type: T;
                  message: string;
                  fallback: TypeMap[T]["fallback"];
              }) & {
            validator?: (input: unknown) => boolean;
        };
    }
}

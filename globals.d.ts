declare namespace CreateNextStack {
    type Category = {
        id: string;
        label: string;
    };

    type Tool = {
        id: string;
        label: string;
        group: string;
        docker_image_id?: string;
    };

    type Context = {
        name: string;
        external_source_strategy: "docker" | "url";
        tools: Tool[];
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
    }
}

namespace CreateNextStack {
    type ToolSource = "npm" | "external";

    type Group = {
        id: string;
        label: string;
        source_type: ToolSource | "mixed";
    };

    type Tool = {
        id: string;
        label: string;
        group: string;
        source_type?: ToolSource;
        docker_image_id?: string;
        npm_package_id?: string;
    };

    type App = {
        project: {
            dir: string;
            name: string;
        };
        external_source_strategy: "docker" | "url";
        external_source_url_strategy: "write_script" | "download";
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

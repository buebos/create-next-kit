declare namespace CreateNextStack {
    type Config = {
        name: string;

        categories: {
            container?: {
                docker?: boolean;
            };

            db?: {
                postgres?: boolean;
                mysql?: boolean;
                redis?: boolean;
            };
            orm?: {
                prisma?: boolean;
            };

            api?: {
                stripe?: boolean;
                googleMaps?: boolean;
            };
            oauth?: {
                google?: boolean;
                github?: boolean;
                facebook?: boolean;
            };

            lib?: {
                shadcnui?: boolean;
            };
        };
    };

    type TechCategory = Config["categories"];

    type TechTitleMap = {
        [key in keyof Required<Config["categories"]>]: {
            [tech in keyof Required<Config["categories"][key]>]: string;
        };
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

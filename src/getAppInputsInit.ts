import groups from "../data/group.json";
import tools from "../data/tool.json";
import { clinput } from "./util/clinput";

async function getAppInputsInit(): Promise<CreateNextStack.App> {
    const app: CreateNextStack.App = {
        project: {
            name: await clinput({
                type: "string",
                message:
                    "What's your project name? (will pick the last subdir on your input like)",
                fallback: "my-app",
                validator: (name) => {
                    return (
                        typeof name === "string" && name != "." && name != ".."
                    );
                },
            }),
            dir: "",
        },
        external_source_strategy: "url",
        external_source_url_strategy: "write_script",
        tools: [],
    };

    /**
     * Handle a name with subdirs for example: parent-1/parent-2/my-app
     * will result on a name simple name like my-app.
     */
    const subdirs = app.project.name.split("/");

    app.project.dir += app.project.name;
    app.project.name = subdirs[subdirs.length - 1];

    /**
     * For each tool group it should capture the desired tools of that
     * section that the user wishes to include.
     */
    for await (const cat of groups) {
        const techs = await clinput({
            type: "multiselect",
            message: "What " + cat.label + " do you want to include?",
            choices: tools
                .filter((tool) => tool.group == cat.id)
                .map((tool) => {
                    return {
                        title: tool.label,
                        value: tool.id,
                    };
                }),
        });

        for (const tech of techs) {
            app.tools.push(
                tools.find((tool) => tool.id == tech) as CreateNextStack.Tool
            );
        }
    }

    /**
     * Used to handle downloading of external tools.
     */
    if (app.tools.some((tool) => tool.id == "docker")) {
        app.external_source_strategy = "docker";
    }

    /**
     * The app should be created under the generated dir
     * to avoid commits on github with the project in them.
     */
    if (process.env.NODE_ENV === "development") {
        app.project.dir = "generated/" + app.project.dir;
    }

    return app;
}

export default getAppInputsInit;

import { App } from "../../../model/App";
import { Tool } from "../../../model/Tool";
import getGroups from "../../../service/group/getGroups";
import getTools from "../../../service/tool/getTools";
import prompt from "../../../util/prompt";

async function promptAppForm(app: App): Promise<void> {
    const tools = await getTools();
    const groups = await getGroups();

    app.project.name = await prompt({
        type: "string",
        message:
            "What's your project name? (will pick the last subdir on your input)",
        fallback: app.project.name,
        validator: (name) => {
            return typeof name === "string" && name != "." && name != "..";
        },
    });

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
        const techs = await prompt({
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
            app.tools.push(tools.find((tool) => tool.id == tech) as Tool);
        }
    }

    /**
     * Used to handle downloading of external tools.
     */
    if (app.tools.some((tool) => tool.group == "docker")) {
        app.container_strategy = "docker";
    }

    /**
     * The app should be created under the generated dir
     * to avoid commits on github with the project in them.
     */
    if (process.env.NODE_ENV === "development") {
        app.project.dir = "generated/" + app.project.dir;
    }
}

export default promptAppForm;

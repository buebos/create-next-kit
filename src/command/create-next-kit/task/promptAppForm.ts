import { App } from "../../../model/context/CreateNextKit";
import getSections from "../../../service/section/getSections";
import getHostManagers from "../../../service/manager/getHostManagers";
import getManagers from "../../../service/manager/getManagers";
import getTools from "../../../service/tool/getTools";
import prompt from "../../../util/prompt";

/************************************************
 * Task functions
 ************************************************/

/**
 *
 */
async function handleHostManagers(app: App) {
    const managers = await getManagers();

    app.managers = await getHostManagers();

    /** The app flow can continue */
    if (app.managers) {
        return;
    }

    ("Your system fails to answer for a command of any of the dependency managers");
    ("supported by create-next-kit. Please be sure to install any of the following");
    ("for the dependencies you want to use on your project.");
    `${managers.map((m) => "\n - " + m.label)}`;
}

/**
 *
 */
async function handleProjectNaming(app: App) {
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
}

/**
 *
 */
async function handleToolSelections(app: App) {
    const tools = await getTools();
    const sections = await getSections();

    /**
     * For each tool section it should capture the desired tools of that
     * section that the user wishes to include.
     */
    for await (const cat of sections) {
        const toolIDSelections = await prompt({
            type: "multiselect",
            message: "What " + cat.label + " do you want to include?",
            choices: tools
                .filter((tool) => tool.section == cat.id)
                .map((tool) => {
                    return {
                        title: tool.label,
                        value: tool.id,
                    };
                }),
        });

        const toolSelections = tools.filter((tool) => {
            return toolIDSelections.includes(tool.id);
        });

        app.tools.push(...toolSelections);
    }
}

/**
 *
 */
async function handleManagerTools(app: App) {
    for (const tool of app.tools) {
        if (!tool.manager_id) {
            continue;
        }

        const managerTool = app.managers.find((manager) => {
            return manager.id == tool.manager_id;
        });

        if (managerTool) {
            continue;
        }

        "You wish to use the tool: " + tool.label + " for ";
    }
}

/************************************************
 * Main flow function
 ************************************************/

/**
 *
 * @param app
 */
async function promptAppForm(app: App): Promise<void> {
    await handleHostManagers(app);

    await handleProjectNaming(app);

    await handleToolSelections(app);

    await handleManagerTools(app);

    /**
     * The app should be created under the generated dir
     * to avoid commits on github with the project in them.
     */
    if (process.env.NODE_ENV === "development") {
        app.project.dir = "generated/" + app.project.dir;
    }
}

export default promptAppForm;

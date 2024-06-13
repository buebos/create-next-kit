import groupsJSON from "../../data/group.json";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import logger from "../util/logger";
import { underline } from "picocolors";
import downloadExternalTool from "../external/downloadExternalTool";

const groups = groupsJSON as CreateNextStack.Group[];

const Indentation = {
    char: " ",
    width: 4,
};

function indent(level: number) {
    return Indentation.char.repeat(level * Indentation.width);
}

async function handleDockerSetup(app: CreateNextStack.App) {
    const nodeMajorVersion = process.versions.node.split(".")[0];
    /** TODO: This templating like strategy is trash. Fix later. */
    const baseDockerComposeContent = [
        "version: '3'",
        "services:",
        `    ${app.project.dir}:`,
        `        image: node:${nodeMajorVersion}-alpine`,
        `        working_dir: /${app.project.dir}`,
        "        volumes:",
        `            - .:/${app.project.dir}`,
        "        ports:",
        "            - 3000:3000",
        "        environment:",
        "            - NODE_ENV=production",
        "        command: npm run start",
    ].join("\n");

    let dockerComposeContent = `${baseDockerComposeContent}`;

    for await (const tool of app.tools) {
        const group = groups.find((group) => {
            return group.id === tool.group;
        });

        /** In case the tool has a specific source different from it's group */
        if (group?.source_type == "mixed" && tool.source_type != "external") {
            if (!tool.source_type) {
                throw new Error(
                    [
                        `Missing source_type for tool: ${underline(
                            tool.label
                        )}`,
                        `from group: ${underline(group.label)}.\nThis is a`,
                        "development error please notify or add a source_type",
                        "field on data/tool.json file for it.",
                    ].join(" ")
                );
            }

            continue;
        }
        if (group?.source_type != "external") {
            continue;
        }

        if (!tool.docker_image_id) {
            logger.warn(
                tool.label,
                "is an external tool but does not have a docker_image_id." +
                    "\nIt will be handled with it's external url instead."
            );

            switch (app.external_source_url_strategy) {
                case "download": {
                    await downloadExternalTool(app, tool);
                }
                case "write_script": {
                    throw new Error("Unimplemented");
                }
                default:
                    break;
            }

            continue;
        }

        dockerComposeContent += [
            "\n" + indent(1) + tool.id + ":",
            indent(2) + "image: " + tool.docker_image_id,
        ].join("\n");
    }

    const filePath = path.join(app.project.dir, "docker-compose.yaml");

    await mkdir(app.project.dir, { recursive: true });
    await writeFile(filePath, dockerComposeContent);
}

export default handleDockerSetup;

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { underline } from "picocolors";
import toolDownload from "../tool/downloadFromUrl";
import getExternalSource from "../tool/getExternalSource";
import { APP_RESOURCE_DIR } from "../../util/constant";
import logger from "../../util/logger";
import { App } from "../../model/App";

const Indentation = {
    char: " ",
    width: 4,
};

function indent(level: number) {
    return Indentation.char.repeat(level * Indentation.width);
}

async function writeComposeFile(app: App) {
    const nodeMajorVersion = process.versions.node.split(".")[0];
    /** TODO: This templating like strategy is trash. Fix later. */
    const baseDockerComposeContent = [
        "version: '3'",
        "services:",
        `    ${app.project.name}:`,
        `        image: node:${nodeMajorVersion}-alpine`,
        `        working_dir: /${app.project.name}`,
        "        volumes:",
        `            - .:/${app.project.name}`,
        "        ports:",
        "            - 3000:3000",
        "        environment:",
        "            - NODE_ENV=production",
        "        command: npm run start",
    ].join("\n");

    let dockerComposeContent = `${baseDockerComposeContent}`;

    for await (const tool of app.tools) {
        /** In case the tool has a specific external different from it's group */
        if (tool.source_type != "external") {
            if (!tool.source_type) {
                throw new Error(
                    `Missing source_type for tool: ${underline(
                        tool.label
                    )}.\nThis is a development error please notify or add a source_type field on data/tool.json file for it.`
                );
            }

            continue;
        }

        if (!tool.docker_image_id) {
            const external = getExternalSource(tool);

            if (!external) {
                throw Error("No download external for tool: " + tool.label);
            }

            logger.warn(
                `${underline(
                    tool.label
                )} is an external tool but does not have a docker_image_id.\nIt will be handled with it's external url instead.`
            );

            switch (app.external_strategy) {
                case "download": {
                    await toolDownload(tool, external, {
                        dir: path.join(app.project.dir, APP_RESOURCE_DIR),
                        filename: external.tool_id + "." + external.file_extension,
                    });
                }
                case "write_script": {
                    throw new Error("Unimplemented");
                }
                default:
                    break;
            }

            continue;
        }

        dockerComposeContent +=
            "\n" +
            indent(1) +
            tool.id +
            ":" +
            "\n" +
            indent(2) +
            "image: " +
            tool.docker_image_id;
    }

    const filePath = path.join(app.project.dir, "docker-compose.yaml");

    await mkdir(app.project.dir, { recursive: true });
    await writeFile(filePath, dockerComposeContent);
}

export default writeComposeFile;

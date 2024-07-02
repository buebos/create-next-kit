import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { underline } from "picocolors";
import downloadFromExternalSource from "../tool/downloadFromExternalSource";
import getExternalSource from "../tool/getExternalSource";
import {
    APP_PROJECT_RESOURCE_DIR,
    APP_PROJECT_SCRIPT_DIR,
} from "../../util/constant";
import logger from "../../util/logger";
import { Tool } from "../../model/Tool";
import writeDownloadScript from "../tool/writeDownloadScript";

type Params = {
    name: string;
    dir: string;
    tools: Tool[];
};

const Indentation = {
    char: " ",
    width: 4,
};

function indent(level: number) {
    return Indentation.char.repeat(level * Indentation.width);
}

async function writeComposeFile(params: Params) {
    const nodeMajorVersion = process.versions.node.split(".")[0];
    /** TODO: This templating like strategy is trash. Fix later. */
    const baseDockerComposeContent = [
        "version: '3'",
        "services:",
        `    ${params.name}:`,
        `        image: node:${nodeMajorVersion}-alpine`,
        `        working_dir: /${params.dir}`,
        "        volumes:",
        `            - .:/${params.dir}`,
        "        ports:",
        "            - 3000:3000",
        "        environment:",
        "            - NODE_ENV=production",
        "        command: npm run start",
    ].join("\n");
    let dockerComposeContent = `${baseDockerComposeContent}`;

    for (const tool of params.tools) {
        if (tool.source_type != "external") {
            continue;
        }

        if (!tool.docker_image_id) {
            const external = await getExternalSource(tool);

            logger.warn(
                `${underline(
                    tool.label
                )} is an external tool but does not have a docker_image_id.\nIt will be handled with it's external url instead.`
            );

            if (!external) {
                throw new Error(
                    "No external download found for tool: " + tool.label
                );
            }

            await downloadFromExternalSource(tool, external, {
                dir: path.join(params.dir, APP_PROJECT_RESOURCE_DIR),
                filename: external.tool_id + "." + external.file_extension,
            });
            await writeDownloadScript(
                tool,
                path.join(params.dir, APP_PROJECT_SCRIPT_DIR)
            );

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

    const filePath = path.join(params.dir, "docker-compose.yaml");

    await mkdir(params.dir, { recursive: true });
    await writeFile(filePath, dockerComposeContent);
}

export default writeComposeFile;

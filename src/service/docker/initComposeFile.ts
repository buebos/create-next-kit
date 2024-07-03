import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { COMPOSE_FILE_NAME } from "./constant";

type Params = {
    dir: string;
    name: string;
};

async function initComposeFile(params: Params) {
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
        "",
    ].join("\n");

    const filePath = path.join(params.dir, COMPOSE_FILE_NAME);

    await mkdir(params.dir, { recursive: true });
    await writeFile(filePath, baseDockerComposeContent);
}

export default initComposeFile;

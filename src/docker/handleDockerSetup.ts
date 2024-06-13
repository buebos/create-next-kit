import groups from "../../data/group.json";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function handleDockerSetup(ctx: CreateNextStack.Context) {
    const nodeMajorVersion = process.versions.node.split(".")[0];
    /** TODO: This templating like strategy is trash. Fix later. */
    const baseDockerComposeContent = [
        "version: '3'",
        "services:",
        "    app:",
        `        image: node:${nodeMajorVersion}-alpine`,
        "        working_dir: /app",
        "        volumes:",
        "            - .:/app",
        "        ports:",
        "            - 3000:3000",
        "        environment:",
        "            - NODE_ENV=production",
        "        command: npm run start",
    ].join("\n");

    const additionalServices = ctx.tools
        .filter((tool) => {
            const group = groups.find((group) => {
                return group.id === tool.group;
            });
            const isInternalSource = group?.source == "npm";

            return !isInternalSource && tool.docker_image_id;
        })
        .map((tool) => {
            return `\n${" ".repeat(4)}${tool.id}:\n${" ".repeat(8)}image: ${
                tool.docker_image_id
            }\n`;
        })
        .join("");

    const dockerComposeContent = `${baseDockerComposeContent}${additionalServices}`;
    const filePath = path.join(ctx.name, "docker-compose.yaml");

    await mkdir(ctx.name, { recursive: true });
    await writeFile(filePath, dockerComposeContent);
}

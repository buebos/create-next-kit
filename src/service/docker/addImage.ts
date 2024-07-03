import { appendFile } from "fs/promises";
import path from "path";
import { COMPOSE_FILE_NAME } from "./constant";
import { Image } from "../../model/docker/Image";

const INDENT_WIDTH = 4;
const indent = " ".repeat(INDENT_WIDTH);

export async function addImage(image: Image, dir: string) {
    /**
     * This will look something like:
     *
     * ```yaml
     *     tool:
     *         image: tool_image_id
     *
     * ```
     *
     * The indent at start of tool is intentional to match
     * the compose yaml structure.
     */
    const content =
        indent +
        image.name +
        ":" +
        "\n" +
        indent.repeat(2) +
        "image: " +
        image.id +
        "\n";

    await appendFile(path.join(dir, COMPOSE_FILE_NAME), content);
}

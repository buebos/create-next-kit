import { describe, test } from "@jest/globals";
import sources from "../../data/tool_external_source.json";
import downloadFromUrl from "../../src/tool/downloadFromUrl";
import path from "path";

const DOWNLOAD_PATH = path.join("generated", "__tests__", "download");
const tool = {
    id: "stripe_cli",
    group: "stripe",
    label: "Stripe CLI",
    docker_image_id: "stripe/stripe-cli",
    source_type: "external",
} as CreateNextStack.Tool;
const source = sources.find((source) => {
    return source.tool_id == tool.id;
});

if (!source) {
    throw new Error("Provide a valid tool that is in data/tool.json");
}

describe("tool.downloadFromUrl", () => {
    test(
        "download ok",
        async () => {
            await downloadFromUrl(tool, source, {
                dir: DOWNLOAD_PATH,
                filename: source.tool_id + "." + source.file_extension,
            });
        },
        1_000 * 60 * 10
    );
});

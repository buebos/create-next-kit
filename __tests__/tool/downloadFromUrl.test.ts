import { describe, test } from "@jest/globals";
import sources from "../../data/tool_external_source.json";
import download from "../../src/util/file/download";
import path from "path";

const DOWNLOAD_PATH = path.join("generated", "__tests__", "download");
const tool = {
    id: "stripe_cli",
    group: "stripe",
    label: "Stripe CLI",
    docker_image_id: "stripe/stripe-cli",
    source_type: "external",
};
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
            await download(
                source.url,
                DOWNLOAD_PATH,
                tool.id + "." + source.file_extension
            );
        },
        1_000 * 60 * 10
    );
});

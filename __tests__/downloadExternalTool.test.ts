import { describe, test } from "@jest/globals";
import tools from "../data/tool.json";
import downloadExternalTool from "../src/external/downloadExternalTool";
import path from "path";

describe("downloadExternalTool", () => {
    test(
        "external tool download ok",
        async () => {
            await downloadExternalTool(
                {
                    project: {
                        name: "my-app",
                        dir: path.join("generated", "my-app"),
                    },
                    external_source_strategy: "docker",
                    external_source_url_strategy: "download",
                    tools: tools as CreateNextStack.Tool[],
                },
                {
                    id: "stripe_cli",
                    group: "stripe",
                    label: "Stripe CLI",
                    docker_image_id: "stripe/stripe-cli",
                    source_type: "external",
                }
            );
        },
        1_000 * 60 * 10
    );
});

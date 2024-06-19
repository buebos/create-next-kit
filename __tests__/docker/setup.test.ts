import { describe, test } from "@jest/globals";
import tools from "../../data/tool.json";
import setup from "../../src/docker/setup";

describe("docker.setup", () => {
    test("docker setup ok", async () => {
        await setup({
            project: {
                name: "my-app",
                dir: "generated/my-app",
            },
            external_source_strategy: "docker",
            external_source_url_strategy: "download",
            tools: tools as CreateNextStack.Tool[],
        });
    }, 10_000);
});

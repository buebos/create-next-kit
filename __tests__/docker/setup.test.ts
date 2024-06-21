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
            external_strategy: "download",
            container_strategy: "docker",
            tools: tools as CreateNextStack.Tool[],
        });
    }, 10_000);
});

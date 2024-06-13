import { describe, test } from "@jest/globals";
import tools from "../data/tool.json";
import handleDockerSetup from "../src/docker/handleDockerSetup";

describe("handleDockerSetup", () => {
    test("docker setup ok", async () => {
        await handleDockerSetup({
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

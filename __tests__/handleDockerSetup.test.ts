import { describe, test } from "@jest/globals";
import tools from "../data/tool.json";
import { handleDockerSetup } from "../src/docker/handleDockerSetup";

describe("handleDockerSetup", () => {
    test("docker setup ok", async () => {
        await handleDockerSetup({
            name: "generated/my-app",
            external_source_strategy: "docker",
            tools,
        });
    }, 10_000);
});

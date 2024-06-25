import { describe, test } from "@jest/globals";
import tools from "../../../data/tool.json";
import { Tool } from "../../../src/model/Tool";
import writeComposeFile from "../../../src/service/docker/writeComposeFile";

describe("service.docker.writeComposeFile", () => {
    test("docker writeComposeFile ok", async () => {
        await writeComposeFile({
            project: {
                name: "my-app",
                dir: "generated/my-app",
            },
            external_strategy: "download",
            container_strategy: "docker",
            tools: tools as Tool[],
        });
    }, 10_000);
});

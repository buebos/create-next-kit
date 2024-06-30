import { describe, test } from "@jest/globals";
import { Tool } from "../../../src/model/Tool";
import writeComposeFile from "../../../src/service/docker/writeComposeFile";
import getTools from "../../../src/service/tool/getTools";

describe("service.docker.writeComposeFile", () => {
    test("docker writeComposeFile ok", async () => {
        await writeComposeFile({
            project: {
                name: "my-app",
                dir: "generated/my-app",
            },
            external_strategy: "download",
            container_strategy: "docker",
            tools: await getTools(),
        });
    }, 10_000);
});

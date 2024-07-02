import { describe, test } from "@jest/globals";
import writeComposeFile from "../../../src/service/docker/writeComposeFile";
import getTools from "../../../src/service/tool/getTools";

describe("service.docker.writeComposeFile", () => {
    test("docker writeComposeFile ok", async () => {
        await writeComposeFile({
            name: "my-app",
            dir: "generated/my-app",
            tools: await getTools(),
        });
    }, 10_000);
});

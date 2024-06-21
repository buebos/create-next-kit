import { describe, test } from "@jest/globals";
import setupAppTools from "../src/setupAppTools";

describe("setupAppTools", () => {
    test("next stack setup with config goes ok", async () => {
        await setupAppTools({
            project: {
                name: "my-app",
                dir: "generated/my-app",
            },
            external_strategy: "download",
            container_strategy: "docker",
            tools: [],
        });
    }, 10_000);
});

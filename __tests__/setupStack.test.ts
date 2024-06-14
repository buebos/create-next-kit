import { describe, test } from "@jest/globals";
import setupTools from "../src/setupTools";

describe("setupStack", () => {
    test("next stack setup with config goes ok", async () => {
        await setupTools({
            project: {
                name: "my-app",
                dir: "generated/my-app",
            },
            external_source_strategy: "url",
            external_source_url_strategy: "download",
            tools: [],
        });
    }, 10_000);
});

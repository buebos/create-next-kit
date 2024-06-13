import { describe, test } from "@jest/globals";
import { setupStack } from "../src/setupStack";

describe("setupStack", () => {
    test("next stack setup with config goes ok", async () => {
        await setupStack({
            name: "my-app",
            external_source_strategy: "url",
            tools: [],
        });
    }, 10_000);
});

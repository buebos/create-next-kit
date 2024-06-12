import { setupStack } from "../src/setupStack";

import { describe, test } from "@jest/globals";

describe("setupStack", () => {
    test("next stack setup with config goes ok", async () => {
        await setupStack({ name: "my-app", categories: {} });
    }, 10_000);
});

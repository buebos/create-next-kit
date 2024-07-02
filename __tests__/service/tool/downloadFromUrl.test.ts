import { describe, test } from "@jest/globals";
import path from "path";
import { Tool } from "../../../src/model/Tool";
import downloadFromUrl from "../../../src/service/tool/downloadFromExternalSource";
import getExternals from "../../../src/service/external/getExternals";

const DOWNLOAD_PATH = path.join("generated", "__tests__", "download");

describe("service.tool.downloadFromUrl", () => {
    test(
        "download ok",
        async () => {
            const externals = await getExternals();
            const tool = {
                id: "stripe_cli",
                group: "stripe",
                label: "Stripe CLI",
                docker_image_id: "stripe/stripe-cli",
                source_type: "external",
            } as Tool;

            const external = externals.find((external) => {
                return external.tool_id == tool.id;
            });

            if (!external) {
                throw new Error(
                    "Provide a valid tool that is in data/tool.json"
                );
            }

            await downloadFromUrl(tool, external, {
                dir: DOWNLOAD_PATH,
                filename: external.tool_id + "." + external.file_extension,
            });
        },
        1_000 * 60 * 10
    );
});

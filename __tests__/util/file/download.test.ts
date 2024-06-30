import { describe, test } from "@jest/globals";
import { mkdir } from "fs/promises";
import path from "path";
import download from "../../../src/util/file/download";
import getExternals from "../../../src/service/external/getExternals";

describe("util.file.download", () => {
    test(
        "external tool download ok",
        async () => {
            const externals = await getExternals();

            for await (const external of externals) {
                /** TODO: Delete this lines so it tests other urls */
                if (external.tool_id == "mysql") {
                    continue;
                }

                const filename =
                    external.tool_id + "." + external.file_extension;
                const dirTarget = path.join(
                    "generated",
                    "__tests__",
                    "util",
                    "file",
                    "download"
                );
                const filedir = path.join(dirTarget, filename);

                await mkdir(dirTarget, { recursive: true });
                await download(external.url, filedir);
            }
        },
        1_000 * 60 * 10
    );
});

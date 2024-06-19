import { describe, test } from "@jest/globals";
import download from "../../../src/util/file/download";
import sources from "../../../data/tool_external_source.json";
import path from "path";
import { unlink } from "fs/promises";

describe("util.file.download", () => {
    test(
        "external tool download ok",
        async () => {
            for await (const source of sources) {
                /** TODO: Delete this lines so it tests other urls */
                if (source.file_extension != "zip") {
                    continue;
                }

                const filename = source.tool_id + "." + source.file_extension;
                const dirTarget = path.join(
                    "generated",
                    "__tests__",
                    "util",
                    "file",
                    "download"
                );

                await download(source.url, dirTarget, filename);

                await unlink(path.join(dirTarget, filename));
            }
        },
        1_000 * 60 * 10
    );
});

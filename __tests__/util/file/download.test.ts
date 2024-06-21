import { describe, test } from "@jest/globals";
import download from "../../../src/util/file/download";
import sources from "../../../data/tool_external_source.json";
import path from "path";
import { mkdir } from "fs/promises";

describe("util.file.download", () => {
    test(
        "external tool download ok",
        async () => {
            for await (const source of sources) {
                /** TODO: Delete this lines so it tests other urls */
                if (source.tool_id == "mysql") {
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
                const filedir = path.join(dirTarget, filename);

                await mkdir(dirTarget, { recursive: true });
                await download(source.url, filedir);
            }
        },
        1_000 * 60 * 10
    );
});

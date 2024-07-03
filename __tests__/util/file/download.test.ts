import { describe, test } from "@jest/globals";
import { mkdir } from "fs/promises";
import path from "path";
import download from "../../../src/util/file/download";
import getSources from "../../../src/service/source/getSources";

describe("util.file.download", () => {
    test(
        "external tool download ok",
        async () => {
            const sources = await getSources();

            for await (const source of sources) {
                if (!source.https) {
                    continue;
                }

                const filename = source.tool_id + "." + source.https;
                const dirTarget = path.join(
                    "generated",
                    "__tests__",
                    "util",
                    "file",
                    "download"
                );
                const filedir = path.join(dirTarget, filename);

                await mkdir(dirTarget, { recursive: true });
                await download(source.https.url, filedir);
            }
        },
        1_000 * 60 * 10
    );
});

import { https } from "follow-redirects";
import { createWriteStream } from "fs";
import { unlink } from "fs/promises";

async function download(url: string, filepath: string) {
    const file = createWriteStream(filepath);

    const res = await new Promise<{ error?: Error }>((resolve, reject) => {
        const request = https.get(url, async (response) => {
            if (response.statusCode !== 200) {
                await unlink(filepath);

                reject(
                    new Error(`Failed to get '${url}' (${response.statusCode})`)
                );

                return;
            }

            response.pipe(file);
        });

        file.on("finish", () => {
            resolve({});
        });

        request.on("error", async (err) => {
            await unlink(filepath);
            reject(err);
        });
        file.on("error", async (err) => {
            await unlink(filepath);
            reject(err);
        });

        request.end();
    });

    if (res.error) {
        throw res.error || new Error("Could not download file from: " + url);
    }
}

export default download;

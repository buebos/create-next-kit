import { https } from "follow-redirects";
import { createWriteStream, unlink } from "fs";
import { mkdir } from "fs/promises";
import path from "path";

async function download(url: string, dir: string, filename: string) {
    await mkdir(dir, { recursive: true });

    const filepath = path.join(dir, filename);
    const file = createWriteStream(filepath);

    const res = await new Promise<{ success: boolean; error?: Error }>(
        (resolve, reject) => {
            const request = https.get(url, async (response) => {
                if (response.statusCode !== 200) {
                    unlink(filepath, () => {
                        reject(
                            new Error(
                                `Failed to get '${url}' (${response.statusCode})`
                            )
                        );
                    });
                    return;
                }

                response.pipe(file);
            });

            file.on("finish", () => resolve({ success: true }));

            request.on("error", (e) => {
                unlink(filepath, () => reject(e));
            });

            file.on("error", (e) => {
                unlink(filepath, () => reject(e));
            });

            request.end();
        }
    );

    if (res.error) {
        throw res.error || new Error("Could not download file from: " + url);
    }
}

export default download;

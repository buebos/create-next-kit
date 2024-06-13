import AdmZip from "adm-zip";
import { createWriteStream } from "fs";

async function unzip(zip: string, destdir: string) {
    return new Promise<{ success: boolean }>((resolve, reject) => {
        new AdmZip(zip).extractAllTo(destdir, true);
        resolve({ success: true });
    });
}

export default unzip;

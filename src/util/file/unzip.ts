import AdmZip from "adm-zip";

async function unzip(zip: string, destdir: string) {
    return new Promise<{ success: boolean }>((resolve) => {
        new AdmZip(zip).extractAllTo(destdir, true);
        resolve({ success: true });
    });
}

export default unzip;

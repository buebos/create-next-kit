import { Platform } from "./Platform";

type DownloadHttps = {
    type: "https";
    details: {
        url: string;
        extension: string;
    };
};
type DownloadManager = {
    type: "manager";
    details: {
        manager_id: string;
        packages: string[];
        flags?: string[];
        command?: {
            target_dir_flag?: string;
        };
    };
};

export type Source = {
    tool_id: string;
    platforms?: Platform[];
    download: DownloadHttps | DownloadManager;
};

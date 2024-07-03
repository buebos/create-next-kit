export type Manager = {
    id: string;
    label: string;
    command?: {
        version?: string;
        install?: string;
        target_dir_flag?: string;
    };
};

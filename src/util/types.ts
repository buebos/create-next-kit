export type ConfigAuth = "google" | "github" | "facebook";
export type ConfigDb = "mysql" | "postgres" | "redis";
export type ConfigOrms = "prisma";

export type ConfigCreateNextExtra = {
    name: string;

    docker?: boolean;

    stripe?: boolean;

    auths?: ConfigAuth[];
    dbs?: ConfigDb[];
    orms?: ConfigOrms[];

    google?: {
        maps?: boolean;
    };
};

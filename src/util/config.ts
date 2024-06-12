export type ConfigDb = "mysql" | "postgres" | "redis";
export type ConfigOrms = "prisma";

export type ConfigCreateNextStack = {
    name: string;

    docker?: boolean;

    dbs?: {
        postgres?: boolean;
        mysql?: boolean;
        redis?: boolean;
    };
    orms?: {
        prisma?: boolean;
    };

    apis?: {
        stripe?: boolean;
        googleMaps?: boolean;
    };
    oauths?: {
        google?: boolean;
        github?: boolean;
        facebook?: boolean;
    };
};

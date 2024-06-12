export const TechTitleMap: CreateNextStack.TechTitleMap = {
    container: {
        docker: "Docker",
    },
    db: {
        mysql: "MySQL",
        postgres: "PostgreSQL",
        redis: "Redis",
    },
    api: {
        stripe: "Stripe",
        googleMaps: "GoogleMaps",
    },
    lib: {
        shadcnui: "ShadCN UI",
    },
    oauth: {
        facebook: "Facebook",
        github: "Github",
        google: "Google",
    },
    orm: {
        prisma: "Prisma",
    },
};

export function getTechOptions<T extends keyof typeof TechTitleMap>(key: T) {
    return Object.entries<(typeof TechTitleMap)[T]>(TechTitleMap[key]).map(
        ([key, title]) => {
            return {
                title: title as string,
                value: key,
            } as const;
        }
    );
}

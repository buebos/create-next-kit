import clinput from "../util/clinput";

export async function getDbsRes() {
    const res = {
        postgres: false,
        mysql: false,
        redis: false,
    };

    const dbs = await clinput({
        type: "multiselect",
        message: "What DBs do you want to include?",
        choices: [
            {
                title: "MySQL",
                value: "mysql",
            },
            {
                title: "Postgres",
                value: "postgres",
            },
        ],
    });

    for (const db of dbs) {
        if (res[db.value] !== undefined) {
            res[db.value] = true;
        }
    }

    return res;
}

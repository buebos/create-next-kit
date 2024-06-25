export type Tool = {
    id: string;
    label: string;
    group: string;
    source_type: "npm" | "external" | "manual";
    docker_image_id?: string;
    npm_package_id?: string;
};

import { OSGroup } from "./OsGroup";

export type External = {
    tool_id: string;
    os_groups: OSGroup[];
    file_extension: string;
    url: string;
};

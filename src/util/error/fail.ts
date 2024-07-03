import getMessage from "./getMessage";

type ErrorID = Parameters<typeof getMessage>[0];
type ErrorMessageOptions = Parameters<typeof getMessage>[1];

function fail(id: ErrorID, options: ErrorMessageOptions): never {
    throw new Error(getMessage(id, options));
}

export default fail;

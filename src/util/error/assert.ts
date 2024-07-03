import getMessage from "./getMessage";

type ErrorID = Parameters<typeof getMessage>[0];
type ErrorMessageOptions = Parameters<typeof getMessage>[1];

function assert(
    predicate: unknown,
    id: ErrorID,
    options: ErrorMessageOptions
): asserts predicate {
    if (!!predicate) {
        return;
    }

    throw new Error(getMessage(id, options));
}

export default assert;

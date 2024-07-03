import getMessage from "./getMessage";

type ErrorID = Parameters<typeof getMessage>[0];
type ErrorMessageOptions = Parameters<typeof getMessage>[1];

type Fail = {
    error: ErrorID;
    message: ErrorMessageOptions;
};

function assert(predicate: unknown, fail: Fail): asserts predicate {
    if (!!predicate) {
        return;
    }

    throw new Error(getMessage(fail.error, fail.message));
}

export default assert;

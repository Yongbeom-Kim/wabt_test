/**
 * Naive way of doing a 'blocking' await
 * TODO: Replace with generator functions, once i figure out whateger they are
 * Assumes promise does not reject.
 * @param p promise to wait
 * @returns the thing inside the promise
 */
export function __await<T>(p: Promise<T>): T {
    let result: T | undefined;
    let returnUndefined = false;

    p.then(
        (value) => {
            console.log("got value");
            result = value;
            if (typeof value === 'undefined') returnUndefined = true;
        },
        (err) => { throw err; },
    );

    while (typeof result === 'undefined' && !returnUndefined) {
        console.log("Waiting...");
        continue;
    }

    // @ts-expect-error if result is undefined, T is undefined
    return result;
}
/**
 * Deep merges two objects, with the second object taking precedence
 * @param target The base object
 * @param source The object to merge in
 * @returns The merged object
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: any): T {
    if (!isObject(target) || !isObject(source)) {
        return source;
    }

    const output = { ...target } as any;

    Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
            if (!(key in target)) {
                Object.assign(output, { [key]: source[key] });
            } else {
                output[key] = deepMerge(target[key], source[key]);
            }
        } else {
            Object.assign(output, { [key]: source[key] });
        }
    });

    return output;
}

function isObject(item: any): boolean {
    return item && typeof item === 'object' && !Array.isArray(item);
} 
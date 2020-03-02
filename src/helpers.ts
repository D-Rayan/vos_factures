function camelize(str: string): string {
    return str.replace(/_([a-z])/g, function(letter, p1) {
        return letter[1].toUpperCase();
    });
}

function unCamelize(str: string): string {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1_").toLowerCase();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const camelizeObject = (object: Record<string, any>) => {
    if (!object) return object;
    const keys = Object.keys(object);
    const newObject = object;
    for (const key of keys) {
        newObject[camelize(key)] = typeof object[key] === "object" ? camelizeObject(object[key]) : object[key];
        if (camelize(key) !== key) delete newObject[key];
    }
    return newObject;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const unCamelizeObject = (object: Record<string, any>) => {
    if (!object) return object;
    const keys = Object.keys(object);
    const newObject = object;
    for (const key of keys) {
        newObject[unCamelize(key)] = typeof object[key] === "object" ? unCamelizeObject(object[key]) : object[key];
        if (unCamelize(key) !== key) delete newObject[key];
    }
    return newObject;
};

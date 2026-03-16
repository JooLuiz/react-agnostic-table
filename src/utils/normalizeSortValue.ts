const normalizeSortValue = (
    value: unknown
): string | number | null => {
    if (value == null) {
        return null;
    }

    if (typeof value === "number") {
        return Number.isNaN(value) ? null : value;
    }

    if (typeof value === "string") {
        return value;
    }

    if (value instanceof Date) {
        return value.getTime();
    }

    if (typeof value === "boolean") {
        return value ? 1 : 0;
    }

    return null;
};

export default normalizeSortValue;
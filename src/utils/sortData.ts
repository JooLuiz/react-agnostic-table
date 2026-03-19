import normalizeSortValue from "./normalizeSortValue";

const sortData = (data: { row: Record<string, React.ReactNode>; index: number; }[],
    sortConfig: SortConfig) => {
    return data.sort((left, right) => {
        const rawLeft = left.row[sortConfig.key];
        const rawRight = right.row[sortConfig.key];
        const valueLeft = normalizeSortValue(rawLeft);
        const valueRight = normalizeSortValue(rawRight);
        const directionSign = sortConfig.direction === "asc" ? 1 : -1;

        if (valueLeft === null && valueRight === null) {
            return left.index - right.index;
        }

        if (valueLeft === null) {
            return 1;
        }

        if (valueRight === null) {
            return -1;
        }

        if (typeof valueLeft === "string" || typeof valueRight === "string") {
            const leftString = String(valueLeft);
            const rightString = String(valueRight);
            const compared = leftString.localeCompare(rightString, undefined, {
                numeric: true,
                sensitivity: "base",
            });

            if (compared !== 0) {
                return compared * directionSign;
            }

            return left.index - right.index;
        }

        const compared = valueLeft - valueRight;

        if (compared !== 0) {
            return compared * directionSign;
        }

        return left.index - right.index;
    });
};

export default sortData;
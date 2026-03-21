const normalizeFilters = (filters: ActiveTableFilters) => {
    return Object.entries(filters).reduce<ActiveTableFilters>((acc, [key, value]) => {
        if (Array.isArray(value)) {
            if (value.length > 0) {
                acc[key] = value;
            }

            return acc;
        }

        const normalizedValue = value.trim();

        if (normalizedValue.length > 0) {
            acc[key] = normalizedValue;
        }

        return acc;
    }, {});
};

export default normalizeFilters;
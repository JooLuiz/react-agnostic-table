const calculateTotalPages = (totalItems: number, pageSize: number = 10): number => {
    if (totalItems === 0) {
        return 1;
    }

    return Math.ceil(totalItems / Math.max(pageSize, 1));
};

export default calculateTotalPages;
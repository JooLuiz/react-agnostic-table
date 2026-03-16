const getCurrentPageContent = (data: Record<string, number | string | React.ReactNode>[], pageSize: number, currentPage: number) => {
    const startIndex = (currentPage - 1) * Math.max(pageSize, 1);
    const endIndex = startIndex + Math.max(pageSize, 1);
    return data.slice(startIndex, endIndex);
};

export default getCurrentPageContent;
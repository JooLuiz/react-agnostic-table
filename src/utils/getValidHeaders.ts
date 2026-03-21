const getValidHeaders = (
  headers: Record<string, string>,
  targetHeaders?: string[]
) => {
  const headerKeys = new Set(Object.keys(headers));

  return (targetHeaders ?? []).filter((headerKey) => headerKeys.has(headerKey));
};

export default getValidHeaders;

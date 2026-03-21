const getSelectableValuesFromData = (
  data: Record<string, number | string | React.ReactNode>[],
  key: string
) => {
  const values = data.reduce<string[]>((acc, row) => {
    const rowValue = row[key];

    if (typeof rowValue === "string" || typeof rowValue === "number") {
      acc.push(String(rowValue));
    }

    return acc;
  }, []);

  return Array.from(new Set(values));
}

export default getSelectableValuesFromData;
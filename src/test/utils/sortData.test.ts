import sortData from "../../utils/sortData";

describe("sortData", () => {
  const buildRows = (values: unknown[]) =>
    values.map((value, index) => ({
      row: { value } as Record<string, React.ReactNode>,
      index,
    }));

  it("sorts numeric values in ascending and descending order", () => {
    const ascRows = buildRows([3, 1, 2]);
    const descRows = buildRows([3, 1, 2]);

    const ascResult = sortData(ascRows, { key: "value", direction: "asc" });
    const descResult = sortData(descRows, { key: "value", direction: "desc" });

    expect(ascResult.map((item) => item.row.value)).toEqual([1, 2, 3]);
    expect(descResult.map((item) => item.row.value)).toEqual([3, 2, 1]);
  });

  it("sorts string values using localeCompare with numeric behavior", () => {
    const rows = buildRows(["10", "2", "1"]);
    const result = sortData(rows, { key: "value", direction: "asc" });

    expect(result.map((item) => item.row.value)).toEqual(["1", "2", "10"]);
  });

  it("keeps null-like values at the end regardless of direction", () => {
    const ascRows = buildRows([null, 2, 1, undefined]);
    const descRows = buildRows([null, 2, 1, undefined]);

    const ascResult = sortData(ascRows, { key: "value", direction: "asc" });
    const descResult = sortData(descRows, { key: "value", direction: "desc" });

    expect(ascResult.map((item) => item.row.value)).toEqual([1, 2, null, undefined]);
    expect(descResult.map((item) => item.row.value)).toEqual([2, 1, null, undefined]);
  });

  it("uses index to preserve stable ordering when compared values are equal", () => {
    const rows = [
      { row: { value: "A", label: "third" }, index: 2 },
      { row: { value: "A", label: "first" }, index: 0 },
      { row: { value: "A", label: "second" }, index: 1 },
    ] as { row: Record<string, React.ReactNode>; index: number }[];

    const result = sortData(rows, { key: "value", direction: "asc" });
    expect(result.map((item) => item.row.label)).toEqual(["first", "second", "third"]);
  });

  it("falls back to index comparison when both sides normalize to null", () => {
    const rows = [
      { row: { value: null, label: "second" }, index: 1 },
      { row: { value: undefined, label: "first" }, index: 0 },
    ] as { row: Record<string, React.ReactNode>; index: number }[];

    const result = sortData(rows, { key: "value", direction: "asc" });
    expect(result.map((item) => item.row.label)).toEqual(["first", "second"]);
  });
});

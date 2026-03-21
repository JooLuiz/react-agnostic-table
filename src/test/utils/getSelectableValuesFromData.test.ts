import getSelectableValuesFromData from "../../utils/getSelectableValuesFromData";

describe("getSelectableValuesFromData", () => {
  it("extracts and deduplicates string and number values", () => {
    const data = [
      { status: "open" },
      { status: "closed" },
      { status: "open" },
      { status: 10 },
      { status: 2 },
    ];

    expect(getSelectableValuesFromData(data, "status")).toEqual([
      "open",
      "closed",
      "10",
      "2",
    ]);
  });

  it("ignores unsupported value types", () => {
    const data = [
      { status: null },
      { status: undefined },
      { status: true },
      { status: { nested: "value" } },
      { status: ["x"] },
    ] as unknown as Record<string, number | string | React.ReactNode>[];

    expect(getSelectableValuesFromData(data, "status")).toEqual([]);
  });

  it("returns empty array when key has no valid values", () => {
    const data = [{ name: "Ana" }, { name: "Bruno" }];
    expect(getSelectableValuesFromData(data, "status")).toEqual([]);
  });

  it("returns empty array for empty data", () => {
    expect(getSelectableValuesFromData([], "status")).toEqual([]);
  });
});

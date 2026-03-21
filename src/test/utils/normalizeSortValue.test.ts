import normalizeSortValue from "../../utils/normalizeSortValue";

describe("normalizeSortValue", () => {
  it("keeps string and number values", () => {
    expect(normalizeSortValue("abc")).toBe("abc");
    expect(normalizeSortValue(123)).toBe(123);
  });

  it("converts booleans to 1 and 0", () => {
    expect(normalizeSortValue(true)).toBe(1);
    expect(normalizeSortValue(false)).toBe(0);
  });

  it("converts Date values to timestamps", () => {
    const date = new Date("2026-03-20T10:00:00.000Z");
    expect(normalizeSortValue(date)).toBe(date.getTime());
  });

  it("returns null for null, undefined, and NaN", () => {
    expect(normalizeSortValue(null)).toBeNull();
    expect(normalizeSortValue(undefined)).toBeNull();
    expect(normalizeSortValue(Number.NaN)).toBeNull();
  });

  it("returns null for unsupported types", () => {
    expect(normalizeSortValue({})).toBeNull();
    expect(normalizeSortValue([])).toBeNull();
  });
});

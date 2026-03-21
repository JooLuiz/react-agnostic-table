import normalizeFilters from "../../utils/normalizeFilters";

describe("normalizeFilters", () => {
  it("keeps populated arrays and trimmed non-empty strings", () => {
    const result = normalizeFilters({
      group: ["A", "B"],
      name: "  Ana  ",
    });

    expect(result).toEqual({
      group: ["A", "B"],
      name: "Ana",
    });
  });

  it("removes empty arrays and empty or whitespace-only strings", () => {
    const result = normalizeFilters({
      group: [],
      name: "   ",
      city: "",
      valid: "ok",
    });

    expect(result).toEqual({ valid: "ok" });
  });

  it("returns empty object when all values are empty", () => {
    const result = normalizeFilters({
      group: [],
      name: "   ",
    });

    expect(result).toEqual({});
  });
});

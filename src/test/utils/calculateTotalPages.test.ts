import calculateTotalPages from "../../utils/calculateTotalPages";

describe("calculateTotalPages", () => {
  it("calculates total pages for exact and non-exact divisions", () => {
    expect(calculateTotalPages(20, 10)).toBe(2);
    expect(calculateTotalPages(25, 10)).toBe(3);
  });

  it("uses default page size when not provided", () => {
    expect(calculateTotalPages(21)).toBe(3);
  });

  it("returns 1 when there are no items", () => {
    expect(calculateTotalPages(0, 10)).toBe(1);
  });

  it("falls back to page size 1 when page size is zero or negative", () => {
    expect(calculateTotalPages(5, 0)).toBe(5);
    expect(calculateTotalPages(5, -3)).toBe(5);
  });
});

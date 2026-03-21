import getCurrentPageContent from "../../utils/getCurrentPageContent";

describe("getCurrentPageContent", () => {
  const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

  it("returns the correct slice for regular pages", () => {
    expect(getCurrentPageContent(data, 2, 1)).toEqual([{ id: 1 }, { id: 2 }]);
    expect(getCurrentPageContent(data, 2, 2)).toEqual([{ id: 3 }, { id: 4 }]);
  });

  it("falls back to page size 1 when page size is zero or negative", () => {
    expect(getCurrentPageContent(data, 0, 3)).toEqual([{ id: 3 }]);
    expect(getCurrentPageContent(data, -2, 2)).toEqual([{ id: 2 }]);
  });

  it("returns an empty array for out-of-bounds pages", () => {
    expect(getCurrentPageContent(data, 2, 10)).toEqual([]);
  });

  it("returns an empty array for empty data", () => {
    expect(getCurrentPageContent([], 10, 1)).toEqual([]);
  });
});

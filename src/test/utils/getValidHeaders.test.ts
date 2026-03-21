import getValidHeaders from "../../utils/getValidHeaders";

describe("getValidHeaders", () => {
  const headers = {
    id: "ID",
    name: "Name",
    status: "Status",
  };

  it("returns only target headers that exist in headers map", () => {
    expect(getValidHeaders(headers, ["name", "missing", "status"])).toEqual([
      "name",
      "status",
    ]);
  });

  it("preserves order from target headers list", () => {
    expect(getValidHeaders(headers, ["status", "id"])).toEqual(["status", "id"]);
  });

  it("returns empty array when target headers are not provided", () => {
    expect(getValidHeaders(headers)).toEqual([]);
  });

  it("returns empty array when headers map is empty", () => {
    expect(getValidHeaders({}, ["id", "name"])).toEqual([]);
  });
});

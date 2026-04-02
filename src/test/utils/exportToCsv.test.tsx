import { ReactNode } from "react";

import exportToCsv from "../../utils/exportToCsv";

type UrlWithCoverageMocks = {
  createObjectURL: jest.Mock<string, [Blob]>;
  revokeObjectURL: jest.Mock<void, [string]>;
};

const readBlobAsText = (blobContent: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      resolve(String(fileReader.result));
    };

    fileReader.onerror = () => {
      reject(fileReader.error);
    };

    fileReader.readAsText(blobContent);
  });
};

describe("exportToCsv", () => {
  let appendChildSpy: jest.SpyInstance<Node, [node: Node]>;
  let removeChildSpy: jest.SpyInstance<Node, [child: Node]>;
  let clickSpy: jest.SpyInstance<void, []>;

  beforeEach(() => {
    const urlWithCoverageMocks = window.URL as unknown as UrlWithCoverageMocks;
    urlWithCoverageMocks.createObjectURL = jest.fn().mockReturnValue("blob:mock-url");
    urlWithCoverageMocks.revokeObjectURL = jest.fn();

    appendChildSpy = jest.spyOn(document.body, "appendChild");
    removeChildSpy = jest.spyOn(document.body, "removeChild");
    clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("creates CSV using default file name and escaped values", async () => {
    const headers = {
      name: "Name",
      notes: "Notes",
      tags: "Tags",
    };

    const rows: Record<string, string | number | ReactNode>[] = [
      {
        name: "Ana \"A\"",
        notes: "line1\nline2",
        tags: ["A,1", <span key="tag-value">B</span>],
      },
    ];

    exportToCsv(rows, headers);

    const urlWithCoverageMocks = window.URL as unknown as UrlWithCoverageMocks;
    expect(urlWithCoverageMocks.createObjectURL).toHaveBeenCalledTimes(1);

    const generatedBlob = urlWithCoverageMocks.createObjectURL.mock.calls[0][0];
    const csvContent = await readBlobAsText(generatedBlob);

    expect(csvContent.startsWith("Name,Notes,Tags\n")).toBe(true);
    expect(csvContent).toContain("\"Ana \"\"A\"\"\"");
    expect(csvContent).toContain("\"line1\nline2\"");
    expect(csvContent).toContain("\"A,1B\"");

    const createdAnchor = appendChildSpy.mock.calls[0][0] as HTMLAnchorElement;
    expect(createdAnchor.href).toBe("blob:mock-url");
    expect(createdAnchor.download).toBe("table-export.csv");
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(removeChildSpy).toHaveBeenCalledWith(createdAnchor);
    expect(urlWithCoverageMocks.revokeObjectURL).toHaveBeenCalledWith("blob:mock-url");
  });

  it("appends .csv extension when custom file name omits extension", () => {
    exportToCsv([{ name: "Ana" }], { name: "Name" }, "custom-report");

    const createdAnchor = appendChildSpy.mock.calls[0][0] as HTMLAnchorElement;
    expect(createdAnchor.download).toBe("custom-report.csv");
  });

  it("keeps .csv extension when provided in custom file name", () => {
    exportToCsv([{ name: "Ana" }], { name: "Name" }, "custom-report.csv");

    const createdAnchor = appendChildSpy.mock.calls[0][0] as HTMLAnchorElement;
    expect(createdAnchor.download).toBe("custom-report.csv");
  });

  it("falls back to table-export.csv when fileName is blank", () => {
    exportToCsv([{ name: "Ana" }], { name: "Name" }, "   ");

    const createdAnchor = appendChildSpy.mock.calls[0][0] as HTMLAnchorElement;
    expect(createdAnchor.download).toBe("table-export.csv");
  });

  it("does nothing when headers are empty", () => {
    exportToCsv([{ name: "Ana" }], {});

    const urlWithCoverageMocks = window.URL as unknown as UrlWithCoverageMocks;
    expect(urlWithCoverageMocks.createObjectURL).not.toHaveBeenCalled();
    expect(appendChildSpy).not.toHaveBeenCalled();
    expect(removeChildSpy).not.toHaveBeenCalled();
  });

  it("returns safely when window is unavailable", () => {
    const originalWindowDescriptor = Object.getOwnPropertyDescriptor(globalThis, "window");

    if (!originalWindowDescriptor || !originalWindowDescriptor.configurable) {
      return;
    }

    Object.defineProperty(globalThis, "window", {
      value: undefined,
      configurable: true,
      writable: true,
    });

    try {
      expect(() => exportToCsv([{ name: "Ana" }], { name: "Name" })).not.toThrow();
    } finally {
      Object.defineProperty(globalThis, "window", originalWindowDescriptor);
    }
  });
});

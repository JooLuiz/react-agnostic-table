import { fireEvent, render, screen, within } from "@testing-library/react";

import { TableComponent } from "../../components/TableComponent/TableComponent";
import exportToCsv from "../../utils/exportToCsv";

jest.mock("../../utils/exportToCsv", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const rows = [
  { name: "Ana", group: "A", city: "Porto" },
  { name: "Bruno", group: "B", city: "Lisbon" },
  { name: "Carla", group: "A", city: "Coimbra" },
  { name: "Davi", group: "B", city: "Aveiro" },
  { name: "Elisa", group: "A", city: "Braga" },
];

const tableHeaders = {
  name: "Name",
  group: "Group",
  city: "City",
};

const mockedExportToCsv = exportToCsv as jest.MockedFunction<typeof exportToCsv>;

describe("TableComponent export", () => {
  beforeEach(() => {
    mockedExportToCsv.mockClear();
  });

  it("renders export button with default label", () => {
    render(
      <TableComponent
        headers={tableHeaders}
        data={rows}
        export={{ show: true }}
      />
    );

    expect(screen.getByRole("button", { name: "Download" })).toBeInTheDocument();
  });

  it("renders export button with custom label", () => {
    render(
      <TableComponent
        headers={tableHeaders}
        data={rows}
        export={{ show: true, exportLabel: "Export CSV" }}
      />
    );

    expect(screen.getByRole("button", { name: "Export CSV" })).toBeInTheDocument();
  });

  it("calls onExport with filtered data when filters are applied", () => {
    const onExportCallback = jest.fn();

    render(
      <TableComponent
        headers={tableHeaders}
        data={rows}
        pagination={{ pageSize: 10 }}
        filter={{
          show: true,
          filterableHeaders: [{ id: "group", type: "checkbox" }],
        }}
        export={{ show: true, onExport: onExportCallback }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    const dialog = screen.getByRole("dialog", { name: /table filters/i });
    fireEvent.click(within(dialog).getByRole("checkbox", { name: "A" }));
    fireEvent.click(within(dialog).getByRole("button", { name: "Apply" }));

    fireEvent.click(screen.getByRole("button", { name: "Download" }));

    expect(onExportCallback).toHaveBeenCalledTimes(1);
    expect(onExportCallback).toHaveBeenCalledWith([
      { name: "Ana", group: "A", city: "Porto" },
      { name: "Carla", group: "A", city: "Coimbra" },
      { name: "Elisa", group: "A", city: "Braga" },
    ]);
  });

  it("passes custom fileName to exportToCsv", () => {
    render(
      <TableComponent
        headers={tableHeaders}
        data={rows}
        export={{ show: true, fileName: "custom-report" }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Download/i }));

    expect(mockedExportToCsv).toHaveBeenCalledTimes(1);
    expect(mockedExportToCsv).toHaveBeenCalledWith(rows, tableHeaders, "custom-report");
  });
});

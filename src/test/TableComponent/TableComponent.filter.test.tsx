import { fireEvent, render, screen, within } from "@testing-library/react";

import { TableComponent } from "../../components/TableComponent/TableComponent";

const rows = [
  { name: "Ana", group: "A", city: "Porto" },
  { name: "Bruno", group: "B", city: "Lisbon" },
  { name: "Carla", group: "A", city: "Coimbra" },
  { name: "Davi", group: "B", city: "Aveiro" },
  { name: "Elisa", group: "A", city: "Braga" },
];

describe("TableComponent filter", () => {
  it("renders filter trigger when enabled and filters rows internally", () => {
    render(
      <TableComponent
        headers={{ name: "Name", group: "Group", city: "City" }}
        data={rows}
        pagination={{ pageSize: 10 }}
        filter={{
          show: true,
          filterableHeaders: [{ id: "group", type: "checkbox" }],
        }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    const dialog = screen.getByRole("dialog", { name: /table filters/i });
    fireEvent.click(within(dialog).getByRole("checkbox", { name: "A" }));
    fireEvent.click(within(dialog).getByRole("button", { name: "Apply" }));

    expect(screen.getByText("Ana")).toBeInTheDocument();
    expect(screen.getByText("Carla")).toBeInTheDocument();
    expect(screen.getByText("Elisa")).toBeInTheDocument();
    expect(screen.queryByText("Bruno")).not.toBeInTheDocument();
    expect(screen.queryByText("Davi")).not.toBeInTheDocument();
  });

  it("calls onFilter callback with applied filters", () => {
    const onFilter = jest.fn();

    render(
      <TableComponent
        headers={{ name: "Name", group: "Group", city: "City" }}
        data={rows}
        pagination={{ pageSize: 10 }}
        filter={{
          show: true,
          onFilter,
          filterableHeaders: [{ id: "group", type: "checkbox" }],
        }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    const dialog = screen.getByRole("dialog", { name: /table filters/i });
    fireEvent.click(within(dialog).getByRole("checkbox", { name: "A" }));
    fireEvent.click(within(dialog).getByRole("button", { name: "Apply" }));

    expect(onFilter).toHaveBeenLastCalledWith({ group: ["A"] });
  });

  it("resets pagination to first page when filters are applied", () => {
    render(
      <TableComponent
        headers={{ name: "Name", group: "Group", city: "City" }}
        data={rows}
        pagination={{ pageSize: 2 }}
        filter={{
          show: true,
          filterableHeaders: [{ id: "group", type: "checkbox" }],
        }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute("aria-current", "page");

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    const dialog = screen.getByRole("dialog", { name: /table filters/i });
    fireEvent.click(within(dialog).getByRole("checkbox", { name: "A" }));
    fireEvent.click(within(dialog).getByRole("button", { name: "Apply" }));

    expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute("aria-current", "page");
  });

  it("handles invalid filterable headers without crashing", () => {
    render(
      <TableComponent
        headers={{ name: "Name", group: "Group", city: "City" }}
        data={rows}
        pagination={{ pageSize: 10 }}
        filter={{
          show: true,
          filterableHeaders: [{ id: "unknownHeader", type: "checkbox" }],
        }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    expect(screen.getByText("No filters configured.")).toBeInTheDocument();
  });

  it("falls back to center modal behavior with invalid filter location", () => {
    render(
      <TableComponent
        headers={{ name: "Name", group: "Group", city: "City" }}
        data={rows}
        pagination={{ pageSize: 10 }}
        filter={{
          show: true,
          location: "invalid" as never,
          filterableHeaders: [{ id: "group", type: "checkbox" }],
        }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    const dialog = screen.getByRole("dialog", { name: /table filters/i });
    expect(dialog).toHaveClass("modalCenter");
    expect(dialog).not.toHaveClass("modalLeft");
    expect(dialog).not.toHaveClass("modalRight");
  });
});

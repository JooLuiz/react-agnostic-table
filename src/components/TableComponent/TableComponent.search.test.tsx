import { fireEvent, render, screen } from "@testing-library/react";

import { TableComponent } from "./TableComponent";

describe("TableComponent search", () => {
  it("filters rows internally with All across searchable headers", () => {
    render(
      <TableComponent
        params={{
          headers: { name: "Name", city: "City" },
          data: [
            { name: "Ana", city: "Porto" },
            { name: "Carlos", city: "Lisbon" },
          ],
          showSearchInput: true,
          searchableHeaders: ["name", "city"],
          pageSize: 10,
        }}
      />
    );

    const input = screen.getByLabelText("Search term");
    fireEvent.change(input, { target: { value: "porto" } });

    expect(screen.getByText("Ana")).toBeInTheDocument();
    expect(screen.getByText("Porto")).toBeInTheDocument();
    expect(screen.queryByText("Carlos")).not.toBeInTheDocument();
    expect(screen.queryByText("Lisbon")).not.toBeInTheDocument();
  });

  it("calls onSearchCallback with term and selected key", () => {
    const onSearchCallback = jest.fn();

    render(
      <TableComponent
        params={{
          headers: { name: "Name", city: "City" },
          data: [
            { name: "Ana", city: "Porto" },
            { name: "Carlos", city: "Lisbon" },
          ],
          showSearchInput: true,
          searchableHeaders: ["name", "city"],
          externalSearch: true,
          onSearchCallback,
          pageSize: 10,
        }}
      />
    );

    const input = screen.getByLabelText("Search term");
    fireEvent.change(input, { target: { value: "ana" } });

    fireEvent.click(screen.getByRole("button", { name: /all/i }));
    fireEvent.click(screen.getByRole("option", { name: "Name" }));

    expect(onSearchCallback).toHaveBeenLastCalledWith("ana", "name");
  });
});

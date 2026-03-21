import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { TableComponent } from "../../components/TableComponent/TableComponent";

describe("TableComponent search", () => {
  it("filters rows internally with All across searchable headers", () => {
    render(
      <TableComponent
        headers={{ name: "Name", city: "City" }}
        data={[
          { name: "Ana", city: "Porto" },
          { name: "Carlos", city: "Lisbon" },
        ]}
        search={{
          show: true,
          searchableHeaders: ["name", "city"],
        }}
        pagination={{ pageSize: 10 }}
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
        headers={{ name: "Name", city: "City" }}
        data={[
          { name: "Ana", city: "Porto" },
          { name: "Carlos", city: "Lisbon" },
        ]}
        search={{
          show: true,
          searchableHeaders: ["name", "city"],
          isExternal: true,
          onSearch: onSearchCallback,
        }}
        pagination={{ pageSize: 10 }}
      />
    );

    const input = screen.getByLabelText("Search term");
    fireEvent.change(input, { target: { value: "ana" } });

    fireEvent.click(screen.getByRole("button", { name: /all/i }));
    fireEvent.click(screen.getByRole("option", { name: "Name" }));

    expect(onSearchCallback).toHaveBeenLastCalledWith("ana", "name");
  });

  it("resets pagination to first page when search changes", () => {
    render(
      <TableComponent
        headers={{ name: "Name", city: "City" }}
        data={[
          { name: "Name 1", city: "Porto" },
          { name: "Name 2", city: "Lisbon" },
          { name: "Name 3", city: "Coimbra" },
          { name: "Name 4", city: "Aveiro" },
        ]}
        search={{
          show: true,
          searchableHeaders: ["name", "city"],
        }}
        pagination={{ pageSize: 2 }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute("aria-current", "page");

    fireEvent.change(screen.getByLabelText("Search term"), { target: { value: "Name 1" } });

    expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByText("Name 1")).toBeInTheDocument();
    expect(screen.queryByText("Name 3")).not.toBeInTheDocument();
  });

  it("falls back search key to All when selected key becomes invalid", async () => {
    const { rerender } = render(
      <TableComponent
        headers={{ name: "Name", city: "City" }}
        data={[
          { name: "Ana", city: "Porto" },
          { name: "Carlos", city: "Lisbon" },
        ]}
        search={{
          show: true,
          searchableHeaders: ["name", "city"],
        }}
        pagination={{ pageSize: 10 }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /all/i }));
    fireEvent.click(screen.getByRole("option", { name: "Name" }));
    expect(screen.getByRole("button", { name: "Name" })).toBeInTheDocument();

    rerender(
      <TableComponent
        headers={{ name: "Name", city: "City" }}
        data={[
          { name: "Ana", city: "Porto" },
          { name: "Carlos", city: "Lisbon" },
        ]}
        search={{
          show: true,
          searchableHeaders: ["city"],
        }}
        pagination={{ pageSize: 10 }}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
    });
  });
});

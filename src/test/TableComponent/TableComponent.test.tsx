import { render, screen } from "@testing-library/react";

import { TableComponent } from "../../components/TableComponent/TableComponent";

describe("TableComponent base rendering", () => {
  it("renders title, headers, and rows", () => {
    render(
      <TableComponent
        title="Users"
        headers={{ name: "Name", city: "City" }}
        data={[
          { name: "Ana", city: "Porto" },
          { name: "Carlos", city: "Lisbon" },
        ]}
      />
    );

    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "City" })).toBeInTheDocument();
    expect(screen.getByText("Ana")).toBeInTheDocument();
    expect(screen.getByText("Carlos")).toBeInTheDocument();
  });

  it("does not render title when omitted", () => {
    render(
      <TableComponent
        headers={{ name: "Name" }}
        data={[{ name: "Ana" }]}
      />
    );

    expect(screen.queryByText("Users")).not.toBeInTheDocument();
  });

  it("applies custom class names and color palette", () => {
    const { container } = render(
      <TableComponent
        title="Users"
        headers={{ name: "Name" }}
        data={[{ name: "Ana" }]}
        styling={{
          containerClassNames: "custom-container",
          titleClassNames: "custom-title",
          colorPalette: "softEarth",
        }}
      />
    );

    const tableContainer = container.querySelector(".table-container");
    expect(tableContainer).toHaveClass("custom-container");
    expect(tableContainer).toHaveAttribute("data-theme", "softEarth");
    expect(screen.getByText("Users")).toHaveClass("custom-title");
  });

  it("renders safely with empty data", () => {
    render(
      <TableComponent
        headers={{ name: "Name", city: "City" }}
        data={[]}
      />
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(1);
  });

  it("renders safely with empty headers", () => {
    render(
      <TableComponent
        headers={{}}
        data={[{ name: "Ana" }, { name: "Carlos" }]}
      />
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.queryAllByRole("columnheader")).toHaveLength(0);
  });
});

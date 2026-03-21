import { fireEvent, render, screen } from "@testing-library/react";

import { TableComponent } from "../../components/TableComponent/TableComponent";

const getSortIconsForHeader = (headerName: string) => {
  const header = screen.getByRole("columnheader", { name: new RegExp(headerName, "i") });
  const icons = Array.from(header.querySelectorAll("span"));
  const upIcon = icons.find((icon) => icon.textContent === "▲");
  const downIcon = icons.find((icon) => icon.textContent === "▼");

  return { upIcon, downIcon };
};

describe("TableComponent sorting icon states", () => {
  it("highlights only one arrow per sort step and dims both when unsorted", () => {
    render(
      <TableComponent
        headers={{ name: "Nome", age: "Age" }}
        data={[
          { name: "Carlos", age: 30 },
          { name: "Ana", age: 20 },
        ]}
        sorting={{ sortableHeaders: ["name"] }}
        pagination={{ pageSize: 10 }}
      />
    );

    const button = screen.getByRole("button", { name: /nome/i });
    const getIcons = () => getSortIconsForHeader("Nome");

    fireEvent.click(button);
    let icons = getIcons();
    expect(icons.upIcon).toHaveClass("sortIconActive");
    expect(icons.downIcon).not.toHaveClass("sortIconActive");

    fireEvent.click(button);
    icons = getIcons();
    expect(icons.upIcon).not.toHaveClass("sortIconActive");
    expect(icons.downIcon).toHaveClass("sortIconActive");

    fireEvent.click(button);
    icons = getIcons();
    expect(icons.upIcon).not.toHaveClass("sortIconActive");
    expect(icons.downIcon).not.toHaveClass("sortIconActive");
  });

  it("resets pagination to first page when sorting changes", () => {
    render(
      <TableComponent
        headers={{ name: "Nome", age: "Age" }}
        data={[
          { name: "Carlos", age: 30 },
          { name: "Ana", age: 20 },
          { name: "Bruno", age: 40 },
          { name: "Davi", age: 35 },
        ]}
        sorting={{ sortableHeaders: ["name"] }}
        pagination={{ pageSize: 2 }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute("aria-current", "page");

    fireEvent.click(screen.getByRole("button", { name: /nome/i }));

    expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute("aria-current", "page");
  });
});

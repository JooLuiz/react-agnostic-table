import { fireEvent, render, screen } from "@testing-library/react";

import { TableComponent } from "./TableComponent";

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
        params={{
          headers: { name: "Nome", age: "Age" },
          data: [
            { name: "Carlos", age: 30 },
            { name: "Ana", age: 20 },
          ],
          sortableHeaders: ["name"],
          pageSize: 10,
        }}
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
});

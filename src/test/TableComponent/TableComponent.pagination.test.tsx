import { fireEvent, render, screen } from "@testing-library/react";

import { TableComponent } from "../../components/TableComponent/TableComponent";

const rows = Array.from({ length: 6 }, (_, index) => ({
  name: `Name ${index + 1}`,
  city: `City ${index + 1}`,
}));

describe("TableComponent pagination", () => {
  it("paginates data internally and emits onChange", () => {
    const onChange = jest.fn();

    render(
      <TableComponent
        headers={{ name: "Name", city: "City" }}
        data={rows}
        pagination={{ pageSize: 2, onChange }}
      />
    );

    expect(screen.getByText("Name 1")).toBeInTheDocument();
    expect(screen.queryByText("Name 3")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));

    expect(screen.queryByText("Name 1")).not.toBeInTheDocument();
    expect(screen.getByText("Name 3")).toBeInTheDocument();
    expect(onChange).toHaveBeenLastCalledWith(2);
  });

  it("syncs external pagination with currentPage prop", () => {
    const { rerender } = render(
      <TableComponent
        headers={{ name: "Name", city: "City" }}
        data={rows}
        pagination={{ pageSize: 2, isExternal: true, currentPage: 2 }}
      />
    );

    expect(screen.getByText("Name 3")).toBeInTheDocument();
    expect(screen.queryByText("Name 1")).not.toBeInTheDocument();

    rerender(
      <TableComponent
        headers={{ name: "Name", city: "City" }}
        data={rows}
        pagination={{ pageSize: 2, isExternal: true, currentPage: 3 }}
      />
    );

    expect(screen.getByText("Name 5")).toBeInTheDocument();
    expect(screen.queryByText("Name 3")).not.toBeInTheDocument();
  });

  it("does not break with invalid pagination location", () => {
    render(
      <TableComponent
        headers={{ name: "Name", city: "City" }}
        data={rows}
        pagination={{ pageSize: 2, location: "invalid" as never }}
      />
    );

    const wrapper = document.querySelector(".pagination-wrapper");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).not.toHaveClass("paginationWrapperAlignedCenter");
    expect(wrapper).not.toHaveClass("paginationWrapperAlignedRight");
  });
});

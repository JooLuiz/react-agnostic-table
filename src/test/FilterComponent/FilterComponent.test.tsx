import { fireEvent, render, screen } from "@testing-library/react";

import { FilterComponent } from "../../components/FilterComponent/FilterComponent";

const headers = {
  name: "Name",
  group: "Group",
};

const data = [
  { name: "Ana", group: "A" },
  { name: "Bruno", group: "B" },
];

describe("FilterComponent base rendering and layout", () => {
  it("renders trigger button and opens modal", () => {
    render(
      <FilterComponent
        headers={headers}
        data={data}
        filterableHeaders={[{ id: "name", type: "input" }]}
        appliedFilters={{}}
        onApply={jest.fn()}
      />
    );

    expect(screen.getByRole("button", { name: /open filters/i })).toBeInTheDocument();
    expect(screen.queryByRole("dialog", { name: /table filters/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    expect(screen.getByRole("dialog", { name: /table filters/i })).toBeInTheDocument();
  });

  it("renders default title and custom title", () => {
    const { rerender } = render(
      <FilterComponent
        headers={headers}
        data={data}
        filterableHeaders={[{ id: "name", type: "input" }]}
        appliedFilters={{}}
        onApply={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    expect(screen.getByText("Filters")).toBeInTheDocument();

    rerender(
      <FilterComponent
        headers={headers}
        data={data}
        filterableHeaders={[{ id: "name", type: "input" }]}
        appliedFilters={{}}
        title="Custom Filter Title"
        onApply={jest.fn()}
      />
    );

    expect(screen.getByText("Custom Filter Title")).toBeInTheDocument();
  });

  it("applies center layout classes by default", () => {
    render(
      <FilterComponent
        headers={headers}
        data={data}
        filterableHeaders={[{ id: "name", type: "input" }]}
        appliedFilters={{}}
        onApply={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    const dialog = screen.getByRole("dialog", { name: /table filters/i });

    expect(dialog).toHaveClass("modalCenter");
    expect(dialog).toHaveClass("modalDialog");
    expect(dialog).not.toHaveClass("modalSidebar");
    expect(dialog).toHaveAttribute("data-is-sidebar", "false");
  });

  it("applies left and right sidebar classes according to location", () => {
    const { rerender } = render(
      <FilterComponent
        headers={headers}
        data={data}
        filterableHeaders={[{ id: "name", type: "input" }]}
        appliedFilters={{}}
        location="left"
        onApply={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    let dialog = screen.getByRole("dialog", { name: /table filters/i });
    expect(dialog).toHaveClass("modalLeft");
    expect(dialog).toHaveClass("modalSidebar");
    expect(dialog).toHaveAttribute("data-is-sidebar", "true");

    rerender(
      <FilterComponent
        headers={headers}
        data={data}
        filterableHeaders={[{ id: "name", type: "input" }]}
        appliedFilters={{}}
        location="right"
        onApply={jest.fn()}
      />
    );

    dialog = screen.getByRole("dialog", { name: /table filters/i });
    expect(dialog).toHaveClass("modalRight");
    expect(dialog).toHaveClass("modalSidebar");
    expect(dialog).toHaveAttribute("data-is-sidebar", "true");
  });

  it("shows empty configuration state when no filterable headers are provided", () => {
    render(
      <FilterComponent
        headers={headers}
        data={data}
        filterableHeaders={[]}
        appliedFilters={{}}
        onApply={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    expect(screen.getByText("No filters configured.")).toBeInTheDocument();
  });
});

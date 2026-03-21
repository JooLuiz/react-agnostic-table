import { fireEvent, render, screen, within } from "@testing-library/react";

import { FilterComponent } from "../../components/FilterComponent/FilterComponent";

describe("FilterComponent edge cases and fallbacks", () => {
  it("closes modal when clicking on backdrop", () => {
    render(
      <FilterComponent
        headers={{ name: "Name" }}
        data={[]}
        filterableHeaders={[{ id: "name", type: "input" }]}
        appliedFilters={{}}
        onApply={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    const dialog = screen.getByRole("dialog", { name: /table filters/i });
    const overlay = dialog.parentElement;

    expect(overlay).not.toBeNull();
    fireEvent.mouseDown(overlay as HTMLElement);

    expect(screen.queryByRole("dialog", { name: /table filters/i })).not.toBeInTheDocument();
  });

  it("falls back to header id label when headers map does not contain the configured key", () => {
    render(
      <FilterComponent
        headers={{}}
        data={[]}
        filterableHeaders={[{ id: "unknownHeader", type: "input" }]}
        appliedFilters={{}}
        onApply={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    expect(screen.getByLabelText("unknownHeader")).toBeInTheDocument();
  });

  it("normalizes empty input and unchecked checkboxes before onApply", () => {
    const onApply = jest.fn();

    render(
      <FilterComponent
        headers={{ name: "Name", group: "Group" }}
        data={[]}
        filterableHeaders={[
          { id: "name", type: "input" },
          { id: "group", type: "checkbox", filterValues: ["A"] },
        ]}
        appliedFilters={{}}
        onApply={onApply}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    const dialog = screen.getByRole("dialog", { name: /table filters/i });
    const nameInput = within(dialog).getByLabelText("Name");
    const checkbox = within(dialog).getByRole("checkbox", { name: "A" });

    fireEvent.change(nameInput, { target: { value: "   " } });
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    fireEvent.click(within(dialog).getByRole("button", { name: "Apply" }));

    expect(onApply).toHaveBeenLastCalledWith({});
  });

  it("uses default action labels when custom labels are not provided", () => {
    render(
      <FilterComponent
        headers={{ name: "Name" }}
        data={[]}
        filterableHeaders={[{ id: "name", type: "input" }]}
        appliedFilters={{}}
        onApply={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    const dialog = screen.getByRole("dialog", { name: /table filters/i });

    expect(within(dialog).getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Apply" })).toBeInTheDocument();
  });

  it("shows no options message when selectable values cannot be inferred", () => {
    render(
      <FilterComponent
        headers={{ group: "Group" }}
        data={[{ group: null as unknown as string }]}
        filterableHeaders={[{ id: "group", type: "checkbox" }]}
        appliedFilters={{}}
        onApply={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    expect(screen.getByText("No options available.")).toBeInTheDocument();
  });

  it("falls back to center modal behavior for an invalid location", () => {
    render(
      <FilterComponent
        headers={{ name: "Name" }}
        data={[]}
        filterableHeaders={[{ id: "name", type: "input" }]}
        location={"invalid" as never}
        appliedFilters={{}}
        onApply={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    const dialog = screen.getByRole("dialog", { name: /table filters/i });

    expect(dialog).toHaveClass("modalCenter");
    expect(dialog).toHaveClass("modalDialog");
    expect(dialog).toHaveAttribute("data-is-sidebar", "false");
  });
});

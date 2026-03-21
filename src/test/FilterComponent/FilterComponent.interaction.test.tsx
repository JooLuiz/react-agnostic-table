import { fireEvent, render, screen, within } from "@testing-library/react";

import { FilterComponent } from "../../components/FilterComponent/FilterComponent";

describe("FilterComponent interactions", () => {
  it("renders input/date/datetime fields and applies normalized values", () => {
    const onApply = jest.fn();

    render(
      <FilterComponent
        headers={{
          name: "Name",
          createdAt: "Created At",
          updatedAt: "Updated At",
        }}
        data={[]}
        filterableHeaders={[
          { id: "name", type: "input" },
          { id: "createdAt", type: "date" },
          { id: "updatedAt", type: "datetime" },
        ]}
        appliedFilters={{}}
        onApply={onApply}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    const dialog = screen.getByRole("dialog", { name: /table filters/i });

    const nameInput = within(dialog).getByLabelText("Name");
    const dateInput = within(dialog).getByLabelText("Created At");
    const datetimeInput = within(dialog).getByLabelText("Updated At");

    expect(nameInput).toHaveAttribute("type", "text");
    expect(dateInput).toHaveAttribute("type", "date");
    expect(datetimeInput).toHaveAttribute("type", "datetime-local");

    fireEvent.change(nameInput, { target: { value: "  Ana  " } });
    fireEvent.change(dateInput, { target: { value: "2026-03-20" } });
    fireEvent.change(datetimeInput, { target: { value: "2026-03-20T10:30" } });
    fireEvent.click(within(dialog).getByRole("button", { name: "Apply" }));

    expect(onApply).toHaveBeenLastCalledWith({
      name: "Ana",
      createdAt: "2026-03-20",
      updatedAt: "2026-03-20T10:30",
    });
    expect(screen.queryByRole("dialog", { name: /table filters/i })).not.toBeInTheDocument();
  });

  it("supports radio selection and sends selected value on apply", () => {
    const onApply = jest.fn();

    render(
      <FilterComponent
        headers={{ status: "Status" }}
        data={[]}
        filterableHeaders={[
          { id: "status", type: "radio", filterValues: ["active", "inactive"] },
        ]}
        appliedFilters={{}}
        onApply={onApply}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    const dialog = screen.getByRole("dialog", { name: /table filters/i });

    fireEvent.click(within(dialog).getByRole("radio", { name: "inactive" }));
    fireEvent.click(within(dialog).getByRole("button", { name: "Apply" }));

    expect(onApply).toHaveBeenLastCalledWith({ status: "inactive" });
  });

  it("supports checkbox toggle and preserves selected values only", () => {
    const onApply = jest.fn();

    render(
      <FilterComponent
        headers={{ group: "Group" }}
        data={[]}
        filterableHeaders={[
          { id: "group", type: "checkbox", filterValues: ["A", "B"] },
        ]}
        appliedFilters={{}}
        onApply={onApply}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    const dialog = screen.getByRole("dialog", { name: /table filters/i });

    fireEvent.click(within(dialog).getByRole("checkbox", { name: "A" }));
    fireEvent.click(within(dialog).getByRole("checkbox", { name: "B" }));
    fireEvent.click(within(dialog).getByRole("checkbox", { name: "B" }));
    fireEvent.click(within(dialog).getByRole("button", { name: "Apply" }));

    expect(onApply).toHaveBeenLastCalledWith({ group: ["A"] });
  });

  it("infers checkbox options from data when filterValues are not provided", () => {
    render(
      <FilterComponent
        headers={{ group: "Group" }}
        data={[
          { group: "A" },
          { group: "B" },
          { group: "A" },
        ]}
        filterableHeaders={[{ id: "group", type: "checkbox" }]}
        appliedFilters={{}}
        onApply={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    const dialog = screen.getByRole("dialog", { name: /table filters/i });

    expect(within(dialog).getByRole("checkbox", { name: "A" })).toBeInTheDocument();
    expect(within(dialog).getByRole("checkbox", { name: "B" })).toBeInTheDocument();
  });

  it("clears applied filters through clear button", () => {
    const onApply = jest.fn();

    render(
      <FilterComponent
        headers={{ name: "Name" }}
        data={[]}
        filterableHeaders={[{ id: "name", type: "input" }]}
        appliedFilters={{ name: "Ana" }}
        onApply={onApply}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /clear filters/i }));
    expect(onApply).toHaveBeenLastCalledWith({});
  });

  it("cancel closes modal and resets draft state without applying", () => {
    const onApply = jest.fn();

    render(
      <FilterComponent
        headers={{ name: "Name" }}
        data={[]}
        filterableHeaders={[{ id: "name", type: "input" }]}
        appliedFilters={{ name: "Ana" }}
        onApply={onApply}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    let dialog = screen.getByRole("dialog", { name: /table filters/i });
    const input = within(dialog).getByLabelText("Name");
    expect(input).toHaveValue("Ana");

    fireEvent.change(input, { target: { value: "Bruno" } });
    fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));

    expect(onApply).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog", { name: /table filters/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /open filters/i }));
    dialog = screen.getByRole("dialog", { name: /table filters/i });
    expect(within(dialog).getByLabelText("Name")).toHaveValue("Ana");
  });
});

import { fireEvent, render, screen } from "@testing-library/react";

import { SearchComponent } from "../../components/SearchComponent/SearchComponent";

describe("SearchComponent interactions", () => {
  const setup = (overrides: Partial<SearchComponentProps> = {}) => {
    const onSearchChange = jest.fn();

    render(
      <SearchComponent
        headers={{ name: "Name", city: "City" }}
        validSearchableHeaders={["name", "city"]}
        searchTerm="ana"
        searchKey="All"
        onSearchChange={onSearchChange}
        {...overrides}
      />
    );

    return { onSearchChange };
  };

  it("calls onSearchChange with new term and current key when typing", () => {
    const { onSearchChange } = setup({ searchKey: "city" });

    fireEvent.change(screen.getByLabelText("Search term"), {
      target: { value: "porto" },
    });

    expect(onSearchChange).toHaveBeenLastCalledWith("porto", "city");
  });

  it("opens options list when dropdown button is clicked", () => {
    setup();

    fireEvent.click(screen.getByRole("button", { name: /all/i }));

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "City" })).toBeInTheDocument();
  });

  it("calls onSearchChange with current term and new key when selecting option", () => {
    const { onSearchChange } = setup({ searchTerm: "lis", searchKey: "All" });

    fireEvent.click(screen.getByRole("button", { name: /all/i }));
    fireEvent.click(screen.getByRole("option", { name: "City" }));

    expect(onSearchChange).toHaveBeenLastCalledWith("lis", "city");
  });

  it("closes dropdown after selecting an option", () => {
    setup();

    fireEvent.click(screen.getByRole("button", { name: /all/i }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("option", { name: "Name" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes dropdown when clicking outside", () => {
    setup();

    fireEvent.click(screen.getByRole("button", { name: /all/i }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

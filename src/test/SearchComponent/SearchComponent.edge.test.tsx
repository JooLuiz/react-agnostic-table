import { fireEvent, render, screen } from "@testing-library/react";

import { SearchComponent } from "../../components/SearchComponent/SearchComponent";

describe("SearchComponent edge cases", () => {
  it("shows only All option when validSearchableHeaders is empty", () => {
    render(
      <SearchComponent
        headers={{ name: "Name" }}
        validSearchableHeaders={[]}
        searchTerm=""
        searchKey="All"
        onSearchChange={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /all/i }));

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent("All");
  });

  it("falls back selected label to All when searchKey does not match any option", () => {
    render(
      <SearchComponent
        headers={{ name: "Name", city: "City" }}
        validSearchableHeaders={["name", "city"]}
        searchTerm=""
        searchKey="invalid-key"
        onSearchChange={jest.fn()}
      />
    );

    expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
  });

  it("falls back option label to raw key when header label is missing", () => {
    render(
      <SearchComponent
        headers={{}}
        validSearchableHeaders={["city"]}
        searchTerm=""
        searchKey="All"
        onSearchChange={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /all/i }));
    expect(screen.getByRole("option", { name: "city" })).toBeInTheDocument();
  });

  it("toggles dropdown open and closed on repeated button clicks", () => {
    render(
      <SearchComponent
        headers={{ name: "Name" }}
        validSearchableHeaders={["name"]}
        searchTerm=""
        searchKey="All"
        onSearchChange={jest.fn()}
      />
    );

    const trigger = screen.getByRole("button", { name: /all/i });
    fireEvent.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

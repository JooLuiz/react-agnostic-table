import { render, screen } from "@testing-library/react";

import { SearchComponent } from "../../components/SearchComponent/SearchComponent";

const baseProps: SearchComponentProps = {
  headers: {
    name: "Name",
    city: "City",
  },
  validSearchableHeaders: ["name", "city"],
  searchTerm: "Ana",
  searchKey: "All",
  onSearchChange: jest.fn(),
};

describe("SearchComponent base rendering", () => {
  it("renders input with placeholder and bound value", () => {
    render(<SearchComponent {...baseProps} />);

    expect(screen.getByLabelText("Search term")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toHaveValue("Ana");
  });

  it("shows default All label when custom label is not provided", () => {
    render(<SearchComponent {...baseProps} />);

    expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
  });

  it("shows custom All label when searchAllFieldsLabel is provided", () => {
    render(
      <SearchComponent
        {...baseProps}
        searchAllFieldsLabel="Everything"
      />
    );

    expect(screen.getByRole("button", { name: /everything/i })).toBeInTheDocument();
  });

  it("shows selected header label when searchKey matches one option", () => {
    render(
      <SearchComponent
        {...baseProps}
        searchKey="city"
      />
    );

    expect(screen.getByRole("button", { name: /city/i })).toBeInTheDocument();
  });
});

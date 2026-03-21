import { render, screen } from "@testing-library/react";

import { PaginationComponent } from "../../components/PaginationComponent/PaginationComponent";

describe("PaginationComponent base rendering", () => {
  it("renders base pagination controls and page buttons", () => {
    render(
      <PaginationComponent
        currentPage={2}
        totalPages={5}
        onPageChange={jest.fn()}
      />
    );

    expect(screen.getByRole("button", { name: "First Page" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous Page" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next Page" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Last Page" })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Page 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 3" })).toBeInTheDocument();
  });

  it("disables First and Previous on first page", () => {
    render(
      <PaginationComponent
        currentPage={1}
        totalPages={5}
        onPageChange={jest.fn()}
      />
    );

    expect(screen.getByRole("button", { name: "First Page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Previous Page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next Page" })).not.toBeDisabled();
    expect(screen.getByRole("button", { name: "Last Page" })).not.toBeDisabled();
  });

  it("disables Next and Last on last page", () => {
    render(
      <PaginationComponent
        currentPage={5}
        totalPages={5}
        onPageChange={jest.fn()}
      />
    );

    expect(screen.getByRole("button", { name: "Next Page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Last Page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "First Page" })).not.toBeDisabled();
    expect(screen.getByRole("button", { name: "Previous Page" })).not.toBeDisabled();
  });

  it("marks active page button with aria-current and active class", () => {
    render(
      <PaginationComponent
        currentPage={3}
        totalPages={6}
        onPageChange={jest.fn()}
      />
    );

    const activePage = screen.getByRole("button", { name: "Page 3" });
    const nonActivePage = screen.getByRole("button", { name: "Page 2" });

    expect(activePage).toHaveAttribute("aria-current", "page");
    expect(activePage).toHaveClass("paginationButtonCurrentPage");
    expect(nonActivePage).not.toHaveAttribute("aria-current");
  });
});

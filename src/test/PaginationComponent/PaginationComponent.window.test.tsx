import { render, screen } from "@testing-library/react";

import { PaginationComponent } from "../../components/PaginationComponent/PaginationComponent";

const getVisiblePages = () => {
  const pageButtons = screen.queryAllByRole("button", { name: /^Page \d+$/ });

  return pageButtons.map((button) => {
    const label = button.getAttribute("aria-label") ?? "";
    return Number(label.replace("Page ", ""));
  });
};

describe("PaginationComponent sliding window", () => {
  it("shows all pages when totalPages is fewer than 5", () => {
    render(
      <PaginationComponent
        currentPage={2}
        totalPages={3}
        onPageChange={jest.fn()}
      />
    );

    expect(getVisiblePages()).toEqual([1, 2, 3]);
  });

  it("shows first five pages when current page is at beginning", () => {
    render(
      <PaginationComponent
        currentPage={1}
        totalPages={10}
        onPageChange={jest.fn()}
      />
    );

    expect(getVisiblePages()).toEqual([1, 2, 3, 4, 5]);
  });

  it("shows centered pages when current page is in middle", () => {
    render(
      <PaginationComponent
        currentPage={5}
        totalPages={10}
        onPageChange={jest.fn()}
      />
    );

    expect(getVisiblePages()).toEqual([3, 4, 5, 6, 7]);
  });

  it("shows last five pages when current page is at end", () => {
    render(
      <PaginationComponent
        currentPage={10}
        totalPages={10}
        onPageChange={jest.fn()}
      />
    );

    expect(getVisiblePages()).toEqual([6, 7, 8, 9, 10]);
  });

  it("does not crash when currentPage is greater than totalPages", () => {
    render(
      <PaginationComponent
        currentPage={10}
        totalPages={5}
        onPageChange={jest.fn()}
      />
    );

    expect(getVisiblePages()).toEqual([1, 2, 3, 4, 5]);
    expect(screen.queryByRole("button", { current: "page" })).not.toBeInTheDocument();
  });
});

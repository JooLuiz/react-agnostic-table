import { fireEvent, render, screen } from "@testing-library/react";

import { PaginationComponent } from "../../components/PaginationComponent/PaginationComponent";

describe("PaginationComponent interactions", () => {
  it("calls onPageChange with currentPage + 1 when Next is clicked", () => {
    const onPageChange = jest.fn();

    render(
      <PaginationComponent
        currentPage={3}
        totalPages={10}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Next Page" }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange with currentPage - 1 when Previous is clicked", () => {
    const onPageChange = jest.fn();

    render(
      <PaginationComponent
        currentPage={3}
        totalPages={10}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Previous Page" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with 1 when First is clicked", () => {
    const onPageChange = jest.fn();

    render(
      <PaginationComponent
        currentPage={4}
        totalPages={10}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "First Page" }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("calls onPageChange with totalPages when Last is clicked", () => {
    const onPageChange = jest.fn();

    render(
      <PaginationComponent
        currentPage={4}
        totalPages={10}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Last Page" }));
    expect(onPageChange).toHaveBeenCalledWith(10);
  });

  it("calls onPageChange with clicked page number", () => {
    const onPageChange = jest.fn();

    render(
      <PaginationComponent
        currentPage={4}
        totalPages={10}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Page 6" }));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });
});

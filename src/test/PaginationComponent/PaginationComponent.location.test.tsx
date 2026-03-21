import { render } from "@testing-library/react";

import { PaginationComponent } from "../../components/PaginationComponent/PaginationComponent";

describe("PaginationComponent location styles", () => {
  it("applies center alignment class for center location", () => {
    const { container } = render(
      <PaginationComponent
        currentPage={1}
        totalPages={5}
        paginationLocation="center"
        onPageChange={jest.fn()}
      />
    );

    const wrapper = container.querySelector(".pagination-wrapper");
    expect(wrapper).toHaveClass("paginationWrapperAlignedCenter");
    expect(wrapper).not.toHaveClass("paginationWrapperAlignedRight");
  });

  it("applies right alignment class for right location", () => {
    const { container } = render(
      <PaginationComponent
        currentPage={1}
        totalPages={5}
        paginationLocation="right"
        onPageChange={jest.fn()}
      />
    );

    const wrapper = container.querySelector(".pagination-wrapper");
    expect(wrapper).toHaveClass("paginationWrapperAlignedRight");
    expect(wrapper).not.toHaveClass("paginationWrapperAlignedCenter");
  });

  it("keeps default start alignment when location is left", () => {
    const { container } = render(
      <PaginationComponent
        currentPage={1}
        totalPages={5}
        paginationLocation="left"
        onPageChange={jest.fn()}
      />
    );

    const wrapper = container.querySelector(".pagination-wrapper");
    expect(wrapper).not.toHaveClass("paginationWrapperAlignedCenter");
    expect(wrapper).not.toHaveClass("paginationWrapperAlignedRight");
  });

  it("does not crash and falls back to default alignment for invalid location", () => {
    const { container } = render(
      <PaginationComponent
        currentPage={1}
        totalPages={5}
        paginationLocation={"invalid" as never}
        onPageChange={jest.fn()}
      />
    );

    const wrapper = container.querySelector(".pagination-wrapper");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).not.toHaveClass("paginationWrapperAlignedCenter");
    expect(wrapper).not.toHaveClass("paginationWrapperAlignedRight");
  });
});

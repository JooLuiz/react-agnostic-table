import LibraryTableComponent, {
  FilterComponent as LibraryFilterComponent,
  PaginationComponent as LibraryPaginationComponent,
  SearchComponent as LibrarySearchComponent,
} from "../index";

import TableComponentFromIndex from "../components/TableComponent";
import PaginationComponentFromIndex from "../components/PaginationComponent";
import SearchComponentFromIndex from "../components/SearchComponent";
import FilterComponentFromIndex from "../components/FilterComponent";

import { TableComponent } from "../components/TableComponent/TableComponent";
import { PaginationComponent } from "../components/PaginationComponent/PaginationComponent";
import { SearchComponent } from "../components/SearchComponent/SearchComponent";
import { FilterComponent } from "../components/FilterComponent/FilterComponent";

describe("library index exports", () => {
  it("exports default TableComponent from src/index.ts", () => {
    expect(LibraryTableComponent).toBeDefined();
    expect(LibraryTableComponent).toBe(TableComponentFromIndex);
    expect(LibraryTableComponent).toBe(TableComponent);
  });

  it("exports named components from src/index.ts", () => {
    expect(LibraryPaginationComponent).toBeDefined();
    expect(LibrarySearchComponent).toBeDefined();
    expect(LibraryFilterComponent).toBeDefined();

    expect(LibraryPaginationComponent).toBe(PaginationComponentFromIndex);
    expect(LibrarySearchComponent).toBe(SearchComponentFromIndex);
    expect(LibraryFilterComponent).toBe(FilterComponentFromIndex);
  });

  it("keeps component index exports aligned with concrete components", () => {
    expect(TableComponentFromIndex).toBe(TableComponent);
    expect(PaginationComponentFromIndex).toBe(PaginationComponent);
    expect(SearchComponentFromIndex).toBe(SearchComponent);
    expect(FilterComponentFromIndex).toBe(FilterComponent);
  });
});

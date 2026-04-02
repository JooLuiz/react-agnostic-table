# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased] - yyyy-mm-dd

### Added

- CSV export support in `TableComponent` through a new `export` config (`show`, `exportLabel`, and `onExport`); default behavior downloads the currently processed table data while allowing custom export handlers.
- New `test:coverage` npm command to run Jest coverage with both detailed per-file output and total coverage summary percentages.

## [1.0.0] - 2026-Mar-23

### Added

- Complete unit test suite covering `TableComponent`, `FilterComponent`, `SearchComponent`, `PaginationComponent`, and all utility functions.
- Pre-commit validation hooks (Husky + lint-staged) that run linting, type-checking, and the full test suite before each commit.
- GitHub Actions PR validation workflow that runs lint, type-check, and tests on every pull request.
- ESLint configuration for TypeScript and React.
- Filter feature in `TableComponent` with support for `input`, `date`, `datetime`, `checkbox`, and `radio` filter types; includes sidebar and dialog modal layouts driven by a `location` prop.
- `FilterComponent` exported publicly alongside `TableComponent` and `SearchComponent`.
- Search functionality in `TableComponent` with support for both internal and external searching modes.
- Custom theming capabilities with three predefined color palettes: `classic`, `modernDark`, and `softEarth`.
- Sorting logic in `TableComponent` supporting both internal and external sorting.

## [0.0.1] - 2025-Aug-28

### Added

- Package Initial Configuration.

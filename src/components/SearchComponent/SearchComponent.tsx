import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./SearchComponent.module.css";
import { ALL_SEARCH_OPTION } from "../../utils/consts";

const SearchComponent = ({
  headers,
  validSearchableHeaders,
  searchTerm,
  searchKey,
  onSearchChange,
}: SearchComponentProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = useMemo(
    () => [
      { key: ALL_SEARCH_OPTION, label: ALL_SEARCH_OPTION },
      ...validSearchableHeaders.map((headerKey) => ({
        key: headerKey,
        label: headers[headerKey] ?? headerKey,
      })),
    ],
    [headers, validSearchableHeaders]
  );

  const selectedOptionLabel = useMemo(() => {
    return (
      options.find((option) => option.key === searchKey)?.label ?? ALL_SEARCH_OPTION
    );
  }, [options, searchKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (newTerm: string) => {
    onSearchChange(newTerm, searchKey);
  };

  const handleOptionSelection = (newKey: string) => {
    onSearchChange(searchTerm, newKey);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        value={searchTerm}
        placeholder="Search..."
        onChange={(event) => handleInputChange(event.target.value)}
        aria-label="Search term"
      />

      <div className={styles.dropdownWrapper} ref={dropdownRef}>
        <button
          type="button"
          className={styles.dropdownButton}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          onClick={() => setIsDropdownOpen((isOpen) => !isOpen)}
        >
          <span>{selectedOptionLabel}</span>
          <span className={styles.dropdownChevron}>v</span>
        </button>

        {isDropdownOpen && (
          <div className={styles.optionsList} role="listbox">
            {options.map((option) => (
              <button
                key={option.key}
                type="button"
                role="option"
                aria-selected={searchKey === option.key}
                className={`${styles.optionItem} ${searchKey === option.key ? styles.optionItemActive : ""
                  }`}
                onClick={() => handleOptionSelection(option.key)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { SearchComponent };

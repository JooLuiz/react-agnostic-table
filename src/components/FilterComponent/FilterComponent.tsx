import { useMemo, useState } from "react";
import PrettyIcons from "js-pretty-icons";

import styles from "./FilterComponent.module.css";

const normalizeFilters = (filters: ActiveTableFilters) => {
  return Object.entries(filters).reduce<ActiveTableFilters>((acc, [key, value]) => {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        acc[key] = value;
      }

      return acc;
    }

    const normalizedValue = value.trim();

    if (normalizedValue.length > 0) {
      acc[key] = normalizedValue;
    }

    return acc;
  }, {});
};

const getSelectableValuesFromData = (
  data: Record<string, number | string | React.ReactNode>[],
  key: string
) => {
  const values = data.reduce<string[]>((acc, row) => {
    const rowValue = row[key];

    if (typeof rowValue === "string" || typeof rowValue === "number") {
      acc.push(String(rowValue));
    }

    return acc;
  }, []);

  return Array.from(new Set(values));
};

const FilterComponent = ({
  headers,
  data,
  filterableHeaders,
  location = "center",
  appliedFilters,
  onApply,
  applyFilterLabel,
  cancelFilterLabel,
  title,
}: FilterComponentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<ActiveTableFilters>({});

  const selectableValuesByHeader = useMemo(() => {
    return filterableHeaders.reduce<Record<string, string[]>>((acc, filterConfig) => {
      if (filterConfig.type !== "checkbox" && filterConfig.type !== "radio") {
        return acc;
      }

      acc[filterConfig.id] =
        filterConfig.filterValues ?? getSelectableValuesFromData(data, filterConfig.id);

      return acc;
    }, {});
  }, [data, filterableHeaders]);

  const openModal = () => {
    setDraftFilters(appliedFilters);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setDraftFilters(appliedFilters);
    setIsModalOpen(false);
  };

  const setInputValue = (key: string, value: string) => {
    setDraftFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  };

  const setRadioValue = (key: string, value: string) => {
    setDraftFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  };

  const toggleCheckboxValue = (key: string, value: string) => {
    setDraftFilters((currentFilters) => {
      const currentValue = currentFilters[key];
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      const nextArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];

      if (nextArray.length === 0) {
        const { [key]: _, ...restFilters } = currentFilters;
        return restFilters;
      }

      return {
        ...currentFilters,
        [key]: nextArray,
      };
    });
  };

  const handleApply = () => {
    onApply(normalizeFilters(draftFilters));
    setIsModalOpen(false);
  };

  const clearFilters = () => {
    setDraftFilters({});
    onApply({});
  };

  const locationClassName =
    location === "left"
      ? styles.modalLeft
      : location === "right"
        ? styles.modalRight
        : styles.modalCenter;

  const isSidebarModal = location === "left" || location === "right";

  return (
    <div className={styles.filterContainer}>
      <button
        type="button"
        aria-label="Open filters"
        className={styles.filterTrigger}
        onClick={openModal}
      >
        <PrettyIcons icon="search" width={16} height={16} />
      </button>

      {appliedFilters && Object.keys(appliedFilters).length > 0 && (
        <button
          type="button"
          aria-label="Clear filters"
          className={styles.filterTrigger}
          onClick={clearFilters}
        >
          <PrettyIcons icon="half-star" width={16} height={16} />
        </button>
      )}

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Table filters"
            className={`${styles.modalPanel} ${isSidebarModal ? styles.modalSidebar : styles.modalDialog} ${locationClassName}`}
            data-is-sidebar={isSidebarModal}
          >
            <div className={styles.modalTitle}>
              {title ?? "Filters"}
            </div>
            <div className={styles.modalContent}>
              {filterableHeaders.map((filterConfig) => {
                const headerLabel = headers[filterConfig.id] ?? filterConfig.id;
                const inputId = `table-filter-${filterConfig.id}`;
                const currentFilterValue = draftFilters[filterConfig.id];

                if (filterConfig.type === "input") {
                  return (
                    <div key={filterConfig.id} className={styles.filterField}>
                      <label htmlFor={inputId} className={styles.filterLabel}>
                        {headerLabel}
                      </label>
                      <input
                        id={inputId}
                        type="text"
                        className={styles.filterInput}
                        value={typeof currentFilterValue === "string" ? currentFilterValue : ""}
                        onChange={(event) => setInputValue(filterConfig.id, event.target.value)}
                      />
                    </div>
                  );
                }

                if (filterConfig.type === "date" || filterConfig.type === "datetime") {
                  return (
                    <div key={filterConfig.id} className={styles.filterField}>
                      <label htmlFor={inputId} className={styles.filterLabel}>
                        {headerLabel}
                      </label>
                      <input
                        id={inputId}
                        type={filterConfig.type === "datetime" ? "datetime-local" : "date"}
                        className={styles.filterInput}
                        value={typeof currentFilterValue === "string" ? currentFilterValue : ""}
                        onChange={(event) => setInputValue(filterConfig.id, event.target.value)}
                      />
                    </div>
                  );
                }

                const values = selectableValuesByHeader[filterConfig.id] ?? [];

                return (
                  <div key={filterConfig.id} className={styles.filterField}>
                    <div className={styles.filterLabel}>{headerLabel}</div>
                    {values.length === 0 && (
                      <div className={styles.emptyOptions}>No options available.</div>
                    )}

                    {values.length > 0 && (
                      <div className={styles.filterChoices}>
                        {values.map((value) => {
                          if (filterConfig.type === "checkbox") {
                            const checkedValues = Array.isArray(currentFilterValue)
                              ? currentFilterValue
                              : [];

                            return (
                              <label key={`${filterConfig.id}-${value}`} className={styles.choiceLabel}>
                                <input
                                  type="checkbox"
                                  value={value}
                                  checked={checkedValues.includes(value)}
                                  onChange={() => toggleCheckboxValue(filterConfig.id, value)}
                                />
                                <span>{value}</span>
                              </label>
                            );
                          }

                          return (
                            <label key={`${filterConfig.id}-${value}`} className={styles.choiceLabel}>
                              <input
                                type="radio"
                                name={`table-filter-radio-${filterConfig.id}`}
                                value={value}
                                checked={currentFilterValue === value}
                                onChange={() => setRadioValue(filterConfig.id, value)}
                              />
                              <span>{value}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {filterableHeaders.length === 0 && (
                <div className={styles.emptyOptions}>No filters configured.</div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button type="button" className={styles.cancelButton} onClick={closeModal}>
                {cancelFilterLabel ?? "Cancel"}
              </button>
              <button type="button" className={styles.applyButton} onClick={handleApply}>
                {applyFilterLabel ?? "Apply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { FilterComponent };

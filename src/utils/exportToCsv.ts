import { isValidElement, type ReactNode } from "react";

type ExportableTableRow = Record<string, number | string | ReactNode>;

const extractTextFromNode = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number" || typeof node === "bigint") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((entry) => extractTextFromNode(entry)).join("");
  }

  if (isValidElement(node)) {
    const elementProps = node.props as { children?: ReactNode };
    return extractTextFromNode(elementProps.children ?? "");
  }

  return "";
};

const escapeCsvCell = (cellValue: string): string => {
  const escapedValue = cellValue.replace(/"/g, "\"\"");
  return /[",\n\r]/.test(escapedValue) ? `"${escapedValue}"` : escapedValue;
};

const exportToCsv = (
  data: ExportableTableRow[],
  headers: Record<string, string>,
  fileName = "table-export"
) => {
  if (typeof window === "undefined") {
    return;
  }

  const headerKeys = Object.keys(headers);

  if (headerKeys.length === 0) {
    return;
  }

  const headerRow = headerKeys
    .map((headerKey) => escapeCsvCell(headers[headerKey] ?? headerKey))
    .join(",");

  const dataRows = data.map((rowData) =>
    headerKeys
      .map((headerKey) => escapeCsvCell(extractTextFromNode(rowData[headerKey])))
      .join(",")
  );

  const csvContent = [headerRow, ...dataRows].join("\n");
  const csvBlob = new Blob([`\uFEFF${csvContent}`], { type: "text/csv;charset=utf-8;" });
  const downloadUrl = window.URL.createObjectURL(csvBlob);
  const anchorElement = document.createElement("a");
  const normalizedFileName = fileName.trim().length > 0 ? fileName.trim() : "table-export";
  const finalFileName = normalizedFileName.toLowerCase().endsWith(".csv")
    ? normalizedFileName
    : `${normalizedFileName}.csv`;

  anchorElement.href = downloadUrl;
  anchorElement.download = finalFileName;
  anchorElement.style.display = "none";

  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement);
  window.URL.revokeObjectURL(downloadUrl);
};

export default exportToCsv;

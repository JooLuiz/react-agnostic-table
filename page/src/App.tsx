import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import DocsPage from "./pages/Docs";
import FilterDocsPage from "./pages/FilterDocs";
import HomePage from "./pages/Home";
import PaginationDocsPage from "./pages/PaginationDocs";
import SearchDocsPage from "./pages/SearchDocs";

const App = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Layout
      theme={theme}
      onToggleTheme={() =>
        setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
      }
    >
      <Routes>
        <Route path="/" element={<HomePage theme={theme} />} />
        <Route path="/docs" element={<DocsPage theme={theme} />} />
        <Route path="/docs/pagination" element={<PaginationDocsPage />} />
        <Route path="/docs/search" element={<SearchDocsPage />} />
        <Route path="/docs/filter" element={<FilterDocsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;

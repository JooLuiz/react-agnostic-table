import { type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
  theme: "dark" | "light";
  onToggleTheme: () => void;
};

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/docs", label: "Table Docs", end: true },
  { to: "/docs/pagination", label: "Pagination" },
  { to: "/docs/search", label: "Search" },
  { to: "/docs/filter", label: "Filter" },
];

const Layout = ({ children, theme, onToggleTheme }: LayoutProps) => {
  return (
    <div className="site-shell">
      <aside className="site-sidebar">
        <Link to="/" className="site-brand">
          react-agnostic-table
        </Link>
        <nav className="site-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="theme-switch-row">
            <span
              className={`theme-icon ${theme === "dark" ? "theme-icon-active" : ""}`}
              aria-hidden="true"
            >
              🌙
            </span>
            <button
              type="button"
              className={`theme-switch ${theme === "light" ? "theme-switch-light" : ""}`}
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span className="theme-switch-thumb" />
            </button>
            <span
              className={`theme-icon ${theme === "light" ? "theme-icon-active" : ""}`}
              aria-hidden="true"
            >
              🌞
            </span>
          </div>
          <Footer />
        </div>
      </aside>
      <main className="site-main">{children}</main>
    </div>
  );
};

export default Layout;

import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout">
      <header className="layout-header">
        <Link to="/" className="site-title">SIFT DIRT</Link>
        <nav style={{ display: "flex", gap: "20px" }}>
          <Link to="/">10 DOORS</Link>
          <Link to="/search">SEARCH</Link>
        </nav>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}

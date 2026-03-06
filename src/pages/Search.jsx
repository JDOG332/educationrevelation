import { useSearchParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { findAnswers } from "../engine/questionEngine.js";
import { DOOR_META } from "../data/subcategories.js";
import SearchBar from "../components/SearchBar.jsx";
import PsiBadge from "../components/PsiBadge.jsx";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = useMemo(() => {
    if (query.length < 2) return { results: [] };
    return findAnswers(query);
  }, [query]);

  return (
    <div className="fade-in">
      <div className="page-header" style={{ textAlign: "center" }}>
        <h1>Ask Anything</h1>
        <p className="page-tagline">Search across 1,000 ideas through 10 doors of knowledge</p>
      </div>

      <SearchBar initialQuery={query} autoFocus={!query} />

      {query && (
        <div className="search-results" style={{ maxWidth: 600, margin: "0 auto" }}>
          {results.results.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--text-dim)", marginTop: 40 }}>
              No matches found. Try different words.
            </p>
          ) : (
            results.results.map((r, i) => {
              const doorName = DOOR_META[r.route.convergence]?.name || r.route.convergence;
              return (
                <Link
                  key={i}
                  to={`/door/${r.route.convergence}/${r.route.subcategory}/${r.route.idea}`}
                  className={`search-result fade-in fade-in-delay-${i + 1}`}
                >
                  <div className="result-header">
                    <span className="result-title">
                      {r.icon && <span style={{ marginRight: 8 }}>{r.icon}</span>}
                      {r.title}
                    </span>
                    <PsiBadge value={r.psi} />
                  </div>
                  <p className="result-answer">{r.answer}</p>
                  <div style={{
                    marginTop: 8,
                    fontSize: "0.7rem",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.1em",
                    color: "var(--text-dim)",
                  }}>
                    {doorName} / {r.route.subcategory}
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

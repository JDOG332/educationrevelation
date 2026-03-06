import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ initialQuery = "", autoFocus = false }) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (q.length >= 2) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <span className="search-icon">?</span>
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask anything... What is gravity? Why do we dream?"
        autoFocus={autoFocus}
      />
    </form>
  );
}

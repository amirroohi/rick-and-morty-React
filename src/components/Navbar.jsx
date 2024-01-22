import { HeartIcon } from "@heroicons/react/24/outline";

export default function Navbar({ numOfResult, children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO💀</div>
      {children}
      <div className="navbar__result">Found {numOfResult} Characters</div>
      <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">3</span>
      </button>
    </nav>
  );
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="search..."
      name=""
      id=""
    />
  );
}

import { HeartIcon } from "@heroicons/react/24/outline";

export default function Navbar({ children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO💀</div>
      {children}
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

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} Characters</div>;
}

export function Favourites({ numOfFavourites }) {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">{numOfFavourites}</span>
    </button>
  );
}

import "./style.css";

export default function SearchBox({ search, setSearch }) {
  return (
    <div className="searchBox">
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search your favourite items..." className="input" />
      <div className="button filter"><i className="icofont-filter"></i></div>
      <div className="button search"><i className="icofont-search"></i></div>
    </div>
  );
}

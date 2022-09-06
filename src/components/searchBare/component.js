import "./style.css";

export default function SearchBox({ search, setSearch }) {

  function cleare() {
    if (search) setSearch('')
  }

  return (
    <div className="searchBox">
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search your favourite items..." className="input" />
      {/* <div className="button filter"><i className="icofont-filter"></i></div> */}
      <div onClick={cleare} className="button search"><i className={search ? 'icofont-close-line' : 'icofont-search'}></i></div>
    </div>
  );

}

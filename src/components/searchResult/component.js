import { useEffect } from "react";
import "./style.css";

function SearchResult({ search, setSearch }) {
    useEffect(() => {
        console.log(search)
    }, [search])
    return <div className="searchResponse">
        
    </div>
}

export default SearchResult
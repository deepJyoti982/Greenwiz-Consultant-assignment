import axios from "axios";
import { useEffect, useState } from "react";
import urls from "../../envirment/envirment";
import EachItem from "../eachItem/component";
import "./style.css";

function SearchResult({ search, setSearch }) {
    const [isloading, setLoading] = useState(false)
    const [searchList, setsearchListg] = useState([])
    useEffect(() => {
        getSearchData(search)
    }, [search])

    function getSearchData(search) {
        setLoading(true)
        axios.get(urls.cocktail.search + search)
            .then(e => {
                setLoading(false)
                setsearchListg(e.data?.drinks || [])
            })
            .catch(e => {
                setLoading(false)
                console.log('Error: ', e)
            })
    }
    return <div className="searchResponse">
        {isloading ? <Loading /> : ''}

        {searchList.map((e, i) => {
            return <EachItem key={i} data={e} />
        })}

        {searchList.length == 0 ? <div className="errorContainer"> No result found!</div> : ''}

    </div>
}

export default SearchResult


function Loading() {
    return <div className="searchLoading">
        <lottie-player
            style={{ height: "200px", width: "200px" }}
            src="./assets/cocktail.json"
            background="transparent"
            speed="10"
            loop
            autoplay
        ></lottie-player>
        Searching Please Wait...
    </div>
}
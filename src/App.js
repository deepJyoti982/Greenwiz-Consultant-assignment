import "./App.css";
import TopPreview from "./components/topPreview/topPreview";
import SearchBox from "./components/searchBare/component";
import { useEffect, useState } from "react";
import urls from "./envirment/envirment";
import axios from "axios";
import EachItem from "./components/eachItem/component";
import ViewFullDetails from "./components/viewEachCockTail/component";
import SearchResult from "./components/searchResult/component";
function App() {
  const [select, setSelect] = useState("");
  const [categories, setCategories] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [loading, setLoading] = useState(false);

  // state for each items
  const [popUpData, setPopUpData] = useState(null);
  // state for searcg
  const [search, setSearch] = useState('');

  useEffect(() => {
    cockTailCategories();
  }, []);

  // function to get cocktailList
  function cockTailCategories() {
    setCategories([]);
    setLoading(true);
    axios
      .get(urls.cocktail.list)
      .then((e) => {
        setLoading(false);
        // console.log(e.data.drinks[0]);
        setSelect(e.data?.drinks[0].strCategory || "");
        setCategories(e.data?.drinks || []);
        // get each Categories data //1st time
        showSelectedCocktails(e.data?.drinks[0].strCategory || "");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }

  function showSelectedCocktails(category = "") {
    let CAKT = category;
    category = category.toString().replace(/ /g, "_");
    category = category.trim();
    if (!category) return;
    setDrinksList([]);
    setSelect(CAKT);
    setLoading(true);
    axios
      .get(urls.cocktail.category_list + category)
      .then((e) => {
        setLoading(false);
        // console.log(e.data?.drinks);
        setDrinksList(e.data?.drinks);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }

  function showPopUp(id) {
    // console.log(id);
    setPopUpData(id);
  }

  return (
    <div className="App">
      {loading ? <LoadingView /> : ""}

      {popUpData ? (
        <ViewFullDetails popUpData={popUpData} setPopUpData={setPopUpData} />
      ) : (
        ""
      )}

      <TopPreview />
      <div className="container mt-5">
        <SearchBox setSearch={setSearch} search={search} />

        {search ? <SearchResult search={search} setSearch={setSearch} /> :

          <div className="outer_div">
            <div className="w-100">
              <div className="row mt-5">
                <div className="col-md-4 mb-5">
                  <div className="scroll-content-left">
                    <ul className="list-group w-100">
                      {categories.map((e, i) => {
                        return (
                          <li
                            onClick={() => {
                              showSelectedCocktails(e.strCategory);
                            }}
                            key={i}
                            className={
                              e.strCategory == select
                                ? "list-group-item active"
                                : "list-group-item"
                            }
                          >
                            {e.strCategory}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="eachElement">
                    {drinksList.map((e, i) => {
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            showPopUp(e?.idDrink);
                          }}
                        >
                          <EachItem data={e} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

        }


      </div>

      <div className="waterMark">
        developed by <a className="pl-1 pr-1" target="_blank" href="https://github.com/SahilKumarGit" > Sahil Kumar Sahoo</a> | Greenwiz Consultant assignment
      </div>
    </div>
  );
}

function LoadingView() {
  return (
    <div className="loadinganimation🔃">
      <lottie-player
        style={{ height: "250px", width: "250px" }}
        src="./assets/cocktail.json"
        background="transparent"
        speed="10"
        loop
        autoplay
      ></lottie-player>
    </div>
  );
}

export default App;

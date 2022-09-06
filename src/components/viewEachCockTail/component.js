import axios from "axios";
import { useEffect, useState } from "react";
import urls from "../../envirment/envirment";
import "./style.css";

export default function ViewFullDetails({ popUpData, setPopUpData }) {
  const [details, setDetails] = useState(null);
  const [Ingredient, setIngredient] = useState([]);
  const [Measure, setMeasure] = useState([]);

  // function for fatchData
  function getCocktelDetails(id) {
    setDetails(null);
    axios
      .get(urls.cocktail.fullDetailse + id)
      .then((o) => {
        console.log(o.data?.drinks[0] || null);
        setDetails(o.data?.drinks[0] || null);
        setIngredient(IngredientArr(o.data?.drinks[0] || null) || []);
        setMeasure(MeasureArr(o.data?.drinks[0] || null) || []);
      })
      .catch((e) => {
        console.log(e);
        alert(e.message || "Something went wrong!");
      });
  }
  useEffect(() => {
    getCocktelDetails(popUpData);
  }, []);

  // set Ingredient fn
  function IngredientArr(obj = null) {
    if (!obj) return null;
    const temp = [];
    for (let e in obj) {
      if (/^strIngredient/.test(e) && obj[e]) temp.push(obj[e]);
    }
    // console.log(temp);
    return temp;
  }

  // set Measure fn
  function MeasureArr(obj = null) {
    if (!obj) return null;
    const temp = [];
    for (let e in obj) {
      if (/^strMeasure/.test(e) && obj[e]) temp.push(obj[e]);
    }
    // console.log(temp);
    return temp;
  }

  /*
  🍷 main container box
  */
  return (
    <div className="🤪viewFullDetails">
      <div className="cardContainer">
        <div className="topNavBar">
          <div className="title">{details?.strDrink || "😅 Loading..."}</div>
          <div
            className="close"
            onClick={() => {
              setPopUpData(null);
            }}
          >
            <i className="icofont-close-line"></i>
          </div>
        </div>

        <div className="popupBody">
          {!details ? (
            <Loading />
          ) : (
            <CocktailDetails
              details={details}
              Ingredient={Ingredient}
              Measure={Measure}
            />
          )}
        </div>
      </div>
      <div
        className="bgTap"
        onClick={() => {
          setPopUpData(null);
        }}
      ></div>
    </div>
  );
}

/*
  🔃 Loading box here
  */

const Loading = () => {
  return (
    <div className="loadingInPopup">
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
};

/*
  💁 Loading box here
*/

const CocktailDetails = ({ details, Ingredient, Measure }) => {
  return (
    <div className="🍷cocktailDetails">
      <div className="session1">
        <img src={details?.strDrinkThumb} alt="" />
        <div className="title">
          <b>{details?.strDrink || "Unavalable"}</b>
        </div>
        <div className="subtitle">
          {details?.strAlcoholic || "Non Alcoholic"}
        </div>
      </div>
      <div className="p16">

        <div className="session2">
          {Ingredient.length > 0 ? (
            <>
              <h5 className="mb-3">Ingredient</h5>
              <div className="mb-4">
                {Ingredient.map((e, i) => {
                  return <span key={i} className="badge badge-pill badge-ldark p-2 pl-3 pr-3">
                    {e}
                  </span>;
                })}
              </div>
            </>
          ) : (
            ""
          )}

          {Measure.length > 0 ? (
            <>
              <h5 className="mb-3">Measure</h5>
              <div className="mb-4">
                {Measure.map((e, i) => {
                  return <span key={i} className="badge badge-pill badge-ldark p-2 pl-3 pr-3">
                    {e}
                  </span>;
                })}
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        {/* session 3  */}
        <div className="session3">
          <table className="table table-bordered">
            <tbody>
              <TrBox title={"Drink Id:"} value={details?.strDrink} />
              <TrBox title={"Tags:"} value={details?.strTags} />
              <TrBox
                title={"Drink Alternate:"}
                value={details?.strDrinkAlternate}
              />
              <TrBox title={"Category:"} value={details?.strCategory} />
              <TrBox title={"IBA:"} value={details?.strIBA} />
              <TrBox title={"Glass:"} value={details?.strGlass} />
              <TrBox title={"Instruction:"} value={details?.strInstructions} />
              <TrBox
                title={"Instructions (ES):"}
                value={details?.strInstructionsES}
              />
              <TrBox
                title={"Instructions (DE):"}
                value={details?.strInstructionsDE}
              />
              <TrBox
                title={"Instructions (FR):"}
                value={details?.strInstructionsFR}
              />
              <TrBox
                title={"Instructions (IT):"}
                value={details?.strInstructionsIT}
              />
              <TrBox
                title={"Instructions (ZH-HANS):"}
                value={details["strInstructionsZH-HANS"]}
              />
              <TrBox
                title={"Instructions (ZH-HANT):"}
                value={details["strInstructionsZH-HANT"]}
              />
              <TrBox
                title={"Creative Commons Confirmed:"}
                value={details?.strCreativeCommonsConfirmed}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function TrBox({ title, value }) {
  if (!value) return "";
  return (
    <tr>
      <th scope="row">{title}</th>
      <td colSpan="2">{value}</td>
    </tr>
  );
}

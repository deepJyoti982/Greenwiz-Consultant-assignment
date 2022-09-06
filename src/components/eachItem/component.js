import urls from "../../envirment/envirment";
import "./style.css";

export default function EachItem({ data }) {
  return (
    <div className="eachItem🍷">
      <img
        src={data?.strDrinkThumb || urls.preview}
        alt="*"
        className="img"
      />
      <div className="context">
        <div className="title">{data?.strDrink || 'Unavalable'}</div>
        <div className="subtitle">Id: {data?.idDrink || '*****'}</div>
      </div>

      <div className="hover"></div>
    </div>
  );
}

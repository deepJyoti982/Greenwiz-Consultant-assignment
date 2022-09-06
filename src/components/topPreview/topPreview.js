import { useEffect, useState } from "react";
import urls from "../../envirment/envirment";
import "./topPreview.css";

export default function TopPreview() {
  const [width, setWidth] = useState();
  window.addEventListener("resize", () => {
    const { innerWidth } = window;
    setWidth(innerWidth);
  });

  useEffect(() => {
    const { innerWidth } = window;
    setWidth(innerWidth);
  }, []);

  return (
    <>
      <div className="🖼️PicContainer">
        <div className="img">
          <img
            src="https://d1uxq5uu95as1y.cloudfront.net/covers/3bd8570f2d74094c_Screen-Shot-2021-03-10-at-3.08.11-PM.png"
            alt="Le Cafe"
            className="img-fluid cover"
          />
        </div>
        {width > 600 ? <DeskTopView width={width} /> : ""}
      </div>

      {width <= 600 ? <MobileView width={width} /> : ""}
    </>
  );
}

function DeskTopView({ width }) {
  return (
    <div className="🤯shadowBox">
      <div className="container">
        <div className="row d-flex align-items-end">
          <div className="col-md-7">
            <div className="restaurant-detailed-header-left">
              <img
                src={urls.preview}
                alt="Le Cafe"
                className="img-fluid mr-3 float-left"
              />
              <h2 className="text-white">The Cocktail</h2>
              <p className="text-white mb-1">
                <i className="icofont-location-pin"></i>
                78 Sazz Street, India
                <br /> <span className="badge badge-status open">open</span>
              </p>
            </div>
          </div>
          <div className="col-md-5">
            <span className="shop-time">
              <i className="icofont-clock-time text-capitalize"></i> time:
              9:00AM - 10:00PM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
function MobileView({ width }) {
  return (
    <div className="mobile_view📵">
      <div className="container">
        <img
          src={urls.preview}
          alt="Le Cafe"
          className="img-fluid mr-3 float-left"
        />
        <div className="heading">
          <b>Le Cafe</b>
        </div>
        <div className="text-dark mb-1">
          <i className="icofont-location-pin"></i>
          <b>78 Sazz Street,{width}</b>
        </div>
        <div className="bottomStatusAndOpeningTime">
          <span className="badge badge-status open">open</span>
          <span className="shop-time">
            <b>
              <i className="icofont-clock-time text-capitalize"></i> time: 9:00AM -
              10:00PM
            </b>
          </span>
        </div>
      </div>
    </div>
  );
}

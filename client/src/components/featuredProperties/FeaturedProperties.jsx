import React from "react";
import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";
import { PROXY } from "../../proxy";

const FeaturedProperties = () => {
  const { data, loading } = useFetch(`${PROXY}/hotels?featured=true`);

  return (
    <div className="fp">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={
                  item?.photos[0] ||
                  "https://girasoleimmobiliare.com/wp-content/themes/homely/images/property-img-default.gif"
                }
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;

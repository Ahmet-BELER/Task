import React from 'react';
import "../css/relatedCard.css"
import { Link } from "react-router-dom"

const RelatedCard = ({ item }) => {
 
  if (!item) {
    return null; 
  }

  return (
    <Link to={{
      pathname: `/item/${item?.id}`,
      state: { productData: item } 
    }}>
      <div className="relatedCard">
        <img
          className="relatedCard__image"
          src={item?.image}
          alt="relatedCard Image"
        />
        <h2 className="relatedCard__title">{item.title}</h2>
      </div>
    </Link>
  );
};

export default RelatedCard;

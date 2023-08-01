import React from 'react';
import '../../css/Card.css';
import { Link } from "react-router-dom"






const Card = ({item}) => {
  return (
    <Link to={{
      pathname: `/item/${item?.id}`,
      state: { productData: item } // Kartın verilerini state olarak iletiyoruz
    }}>
    <div className="card">
      <img
        className="card__image"
        src={item?.image}
        alt="Card Image"
      />
      <h2 className="card__title">{item.title}</h2>
      <p className="card__price">{item.price}$</p>
      <p className="card__category">Category:{item.category}</p>
      <p className="card__category">Rate:{item.rating.rate}</p>

    </div>
    </Link>
  );
};

export default Card;
 
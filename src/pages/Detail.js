import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RelatedCard from '../components/relatedCard';
import '../css/DetailPage.css';
import Slider from "react-slick";

export default function Detail() {
  const { id } = useParams();
  const { products } = useSelector(state => state.products);
  const [item, setItem] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const selectedProduct = products.find(product => product.id === parseInt(id));
    setItem(selectedProduct);

    if (selectedProduct) {
      const relatedProducts = products.filter(product => product.category === selectedProduct.category);
      setRelatedProducts(relatedProducts);
    }
  }, [products, id]);
  const limitedRelatedProducts = relatedProducts.slice(0, 5);

  console.log("relatedProducts", relatedProducts);


  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5, 
    initialSlide: 0, 
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3, 
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2, 
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };



  return (
    <div className="Detay">
      {item ? (
        <div className="cardDetail">
          <div className="cardDetail__imageContainer">
            <img
              className="cardDetail__image"
              src={item.image}
              alt="CardDetail Image"
            />
          </div>
          <div className="cardDetail__texts">
            <h2 className="cardDetail__title">{item.title}</h2>
            <p className="cardDetail__category">Category: {item.category}</p>
            <p className="cardDetail__rate">Rate: {item.rating.rate}</p>
            <p className="cardDetail__price">{item.price}$</p>
            <button className="cardDetail__sepet">Sepete Ekle</button>
          </div>

          <div className="cardDetail__relating">
            İlgilenebileceğiniz ürünler

            <Slider {...settings}>
              {limitedRelatedProducts.map((item) => (
                <RelatedCard key={item.id} item={item} />
              ))}
            </Slider>
          </div>





        </div>
      ) : (
        <h1>Ürün bulma hatası devam ediyor</h1>
      )}
    </div>
  );
}

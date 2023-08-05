import React from 'react';
import "../css/Header.css";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Header() {
  const sepetProducts = useSelector(state => state.products.sepetProducts);

  return (
    <div className="top">
      <Link to={`/`}>
        <div className="header">
          <img src="https://arutesolutions.com/wp-content/uploads/2022/07/arute-solutions-logo-retina.png" alt="Arute Solutions Logo"/>
        </div>
      </Link>
    
      <div className="two">
      <div className="sepet_Length"> {sepetProducts.length}</div>
      </div>
        <Link to={`/sepet`}>
          <div className="sepet">
            <div className="sepet_cover">
              <img src={"/image/shopping.png"} className="icon" alt="whatsap"  />
            </div>
          </div>
        </Link>
      </div>

  );
}

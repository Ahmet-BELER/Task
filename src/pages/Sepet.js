import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToSepet } from '../redux/slices/productsSlice';
import "../css/Sepet.css";

export default function Sepet() {
  const sepetProducts = useSelector(state => state.products.sepetProducts);
  const dispatch = useDispatch();

  const handleRemoveFromSepet = (productId) => {
    dispatch(removeToSepet(productId));
  };

  const totalAmount = sepetProducts.reduce((total, product) => total + product.price, 0);

  return (
    <div className="header">
      <hr />
      <ul className="sepet-list">
        {sepetProducts.map(product => (
          <li key={product.id} className="sepet-item">
            <img src={product.image} style={{ width: "100px", height: "100px" }} />
            <div className="product-info">
              <h3>{product.title}</h3>
              <p className="price">{product.price}$</p>
              <img
               src={"/image/delete.png"} 
               style={{ width: "30px", height: "30px", margin:"20px" }}
               onClick={() => handleRemoveFromSepet(product.id)}

              />
         
            </div>
            <hr/>
          </li>
        ))}
        <div>
        <h1 className="total">Total: {totalAmount}$</h1>
      </div>
      </ul>
   
      <hr />
    </div>
  );
}

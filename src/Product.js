import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
  const [state, dispatch] = useStateValue();

  console.log("basket", state.basket);

  const addToBasket = () => [
    //dispatch the item into the Data Layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    }),
  ];
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>*</p>
            ))}
        </div>
      </div>

      <img src={image} alt={id} />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;

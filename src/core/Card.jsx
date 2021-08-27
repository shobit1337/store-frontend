import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addToCartButton = true,
  removefromCartButton = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "NA";
  const cardDescription = product ? product.description : "NA";
  const cardPrice = product ? product.price : "NA";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getRedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartButton = () =>
    addToCartButton && (
      <div className="col-12">
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      </div>
    );

  const showRemoveFromCartButton = () =>
    removefromCartButton && (
      <div className="col-12">
        <button
          onClick={() => {}}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      </div>
    );

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getRedirect()}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          {showAddToCartButton()}
          {showRemoveFromCartButton()}
        </div>
      </div>
    </div>
  );
};

export default Card;

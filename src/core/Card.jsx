import React from "react";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addToCartButton = true,
  removefromCartButton = false,
}) => {
  const cardTitle = product ? product.name : "NA";
  const cardDescription = product ? product.description : "NA";
  const cardPrice = product ? product.price : "NA";

  const showAddToCartButton = () =>
    addToCartButton && (
      <div className="col-12">
        <button
          onClick={() => {}}
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

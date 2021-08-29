import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { loadCart, emptyCart } from "./helper/cartHelper";

const StripeCheckout = ({
  products,
  setTiggerReload = (x) => x,
  tiggerReload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() ? isAuthenticated().token : undefined;
  const userId = isAuthenticated() ? isAuthenticated().user._id : undefined;

  const getFinalAmount = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Pay with Stripe</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-info">Signin</button>
      </Link>
    );
  };

  const errorMessage = (error) => {
    //
  };

  const successMessage = () => {
    //
  };

  return (
    <div>
      <h3 className="text-white">Total Amount: {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;

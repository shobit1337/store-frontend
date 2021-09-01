import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { emptyCart, loadCart } from "./helper/cartHelper";
import { fetchToken, processPayment } from "./helper/paymentBraintreeHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const BraintreeDropIn = ({
  products,
  setTiggerReload = (x) => x,
  tiggerReload = undefined,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    instance: {},
    error: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getFinalAmount = (products) => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const getToken = (userId, token) => {
    fetchToken(userId, token).then((data) => {
      if (data.error) {
        setInfo({ ...info, error: data.error });
      } else {
        let clientToken = data.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Login and add items to continue</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      let paymentData = {
        paymentMethodNonce: nonce,
        amount: getFinalAmount(products),
      };
      processPayment(userId, token, paymentData)
        .then((data) => {
          setInfo({ ...info, success: true, loading: false });
          let orderData = {
            products: products,
            transcation_id: data.transcation.id,
            amount: data.transcation.amount,
          };
          createOrder(userId, token, orderData);
          emptyCart(() => {
            console.log("Cart emptied");
          });
          setTiggerReload(!tiggerReload);
        })
        .catch((err) =>
          setInfo({ ...info, error: err, loading: false, success: false })
        );
    });
  };

  return (
    <div>
      <h1>{showDropIn()}</h1>
      {info.success && <h2 className="text-success">Payment Successfull!</h2>}
      {info.error && <h2 className="text-warning">Payment Failed.</h2>}
    </div>
  );
};

export default BraintreeDropIn;

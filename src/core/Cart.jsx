import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [tiggerReload, setTiggerReload] = useState();

  useEffect(() => {
    setProducts(loadCart());
  }, [tiggerReload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>Cart Items:</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addToCartButton={false}
              removefromCartButton={true}
              setTiggerReload={setTiggerReload}
              tiggerReload={tiggerReload}
            />
          );
        })}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>Checkout:</h2>
        <StripeCheckout
          products={products}
          setTiggerReload={setTiggerReload}
          tiggerReload={tiggerReload}
        />
      </div>
    );
  };

  return (
    <Base title="My Cart" description="Ready to checkout!">
      <div className="row">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};

export default Cart;

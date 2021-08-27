import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="This our our home page.">
      <div className="row text-center">
        <h1 className="text-white">All Items</h1>
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-4">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
  updateProduct,
  getProduct,
  getAllCategories,
} from "./helper/adminapicall";

function UpdateProduct() {
  const { productId } = useParams();
  const history = useHistory();
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    photo: "",
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    categories: [],
    formData: "",
    error: "",
    loading: false,
    updatedProduct: "",
    didRedirect: false,
  });

  const {
    photo,
    name,
    description,
    price,
    category,
    stock,
    categories,
    formData,
    error,
    loading,
    updatedProduct,
    didRedirect,
  } = values;

  const preLoad = () => {
    // Getting Product Details
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // Further getting all categories
        getAllCategories().then((cate) => {
          if (cate.error) {
            setValues({ ...values, error: cate.error });
          } else {
            // setting values
            setValues({
              ...values,
              name: data.name,
              description: data.description,
              price: data.price,
              category: data.category,
              categories: cate,
              stock: data.stock,
              formData: new FormData(),
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const performRedirect = () => {
    if (updatedProduct) {
      setTimeout(() => {
        setValues({ ...values, updatedProduct: false, didRedirect: true });
        history.push("/admin/dashboard");
      }, 2000);
    }
  };

  const onUpdate = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(productId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          updatedProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert-sucess mt-3"
      style={{ display: updatedProduct ? "" : "none" }}
    >
      {updatedProduct} updated successfully!
    </div>
  );

  const errorMessage = () => (
    <div className="alert-danger mt-3" style={{ display: error ? "" : "none" }}>
      Failed to update new product..
    </div>
  );

  const updateProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          type="text"
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onUpdate}
        className="btn btn-outline-success"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Update Product"
      description="You can update a new product here..."
      className="container bg-info p-4"
    >
      <div className="row bg-dark text-white rounded">
        {successMessage()}
        {errorMessage()}
        {performRedirect()}
        <div className="col-8 offset-md-2">{updateProductForm()}</div>
      </div>
      <div className="mt-5">
        <Link className="btn btn-md btn-dark mb-3" to="/admin/dashboard">
          Back
        </Link>
      </div>
    </Base>
  );
}

export default UpdateProduct;

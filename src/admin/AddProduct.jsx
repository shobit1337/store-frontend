import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createProduct, getAllCategories } from "./helper/adminapicall";

function AddProduct() {
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
    createdProduct: "",
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
    createdProduct,
    didRedirect,
  } = values;

  const preLoad = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const performRedirect = () => {
    if (createdProduct) {
      setTimeout(() => {
        setValues({ ...values, createdProduct: false, didRedirect: true });
        history.push("/admin/dashboard");
      }, 2000);
    }
  };

  const onCreate = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
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
          createdProduct: data.name,
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
      style={{ display: createdProduct ? "" : "none" }}
    >
      {createdProduct} created successfully!
    </div>
  );

  const errorMessage = () => (
    <div className="alert-danger mt-3" style={{ display: error ? "" : "none" }}>
      Failed to create new product..
    </div>
  );

  const createProductForm = () => (
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
        onClick={onCreate}
        className="btn btn-outline-success"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Create Product"
      description="You can create a new product here..."
      className="container bg-info p-4"
    >
      <div className="row bg-dark text-white rounded">
        {successMessage()}
        {errorMessage()}
        {performRedirect()}
        <div className="col-8 offset-md-2">{createProductForm()}</div>
      </div>
      <div className="mt-5">
        <Link className="btn btn-md btn-dark mb-3" to="/admin/dashboard">
          Back
        </Link>
      </div>
    </Base>
  );
}

export default AddProduct;

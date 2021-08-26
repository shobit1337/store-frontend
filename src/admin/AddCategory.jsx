import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleCreate = (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);

    //making backend api call
    // We are passing name as object bcs we are JSON.strinifing it in apicall helper
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Created Successfully!</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return (
        <h4 className="text-danger">Sorry! {name} category already exist.</h4>
      );
    }
  };

  const goBackBtn = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
        Back
      </Link>
    </div>
  );

  const categoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category name:</p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          placeholder="Eg: Summer"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleCreate} className="btn btn-outline-info">
          Create
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create New Category"
      description="Add a new category for new items"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {categoryForm()}
          {goBackBtn()}
        </div>
      </div>
    </Base>
  );
}

export default AddCategory;

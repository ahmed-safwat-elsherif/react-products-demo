import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "./config";

export const AddProduct = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    errors: {},
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const { onAddProduct } = props;
  const navigate = useNavigate();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { errors, ...product } = { ...formData, price: +formData.price }; // {errors, name, price}
    // const product = { ...formData, price: +formData.price }; // <-- formData will be shipping the "errors" obj with the new added product.

    const isValid = validate();
    if (isValid) {
      // onAddProduct(product); // <-- client side
      setLoading(true);
      setError("");
      axios
        .post(BaseUrl + "/products", {
          ...product,
        })
        .then(() => {
          navigate("/products", { replace: true });
        })
        .catch(() => {
          setError("Unable to add product, retry again!");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const validate = () => {
    let errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required!";
    }

    if (!+formData.price) {
      errors.price = "Price is required!";
    }
    setFormData((previousState) => ({ ...previousState, errors }));
    return !Object.keys(errors).length;
  };

  return (
    <div className="pt-5 px-5">
      <h3>Add your product</h3>
      <hr />
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="product-name" className="form-label">
            Product name:
          </label>
          <input
            disabled={loading}
            type="text"
            value={formData.name}
            onChange={handleOnChange}
            className="form-control"
            id="product-name"
            name="name"
          />
          <div className="text-danger my-2">{formData.errors.name}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="product-price" className="form-label">
            Product price
          </label>
          <input
            disabled={loading}
            type="number"
            value={formData.price}
            onChange={handleOnChange}
            className="form-control"
            id="product-price"
            name="price"
          />
          <div className="text-danger my-2">{formData.errors.price}</div>
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </>
          ) : (
            "Add product"
          )}
        </button>
      </form>
    </div>
  );
};

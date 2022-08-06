import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "./config";
import { Loader } from "./Loader";
import { useProduct } from "./hooks/use-product";

export const EditProduct = (props) => {
  const { productId } = useParams();

  const { loading, error, product } = useProduct(productId);

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState("");

  useEffect(() => {
    setFormData((previousState) => ({
      ...previousState,
      name: product?.name || "",
      price: product?.price || "",
    }));
  }, [product]);

  const [formData, setFormData] = useState({
    name: product?.name,
    price: product?.price,
    errors: {},
  });

  const handleOnChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { errors, ...product } = {
      ...formData,
      price: +formData.price,
      id: productId,
    }; // {errors, name, price}
    // const product = { ...formData, price: +formData.price,  id: productId }; // <-- formData will be shipping the "errors" obj with the new added product.

    const isValid = validate();

    if (isValid) {
      // onEditProduct(product); // <- client side
      // using axios
      setLoadingSubmit(true);
      setErrorSubmit("");
      axios
        .put(BaseUrl + "/products/" + productId, {
          ...product,
        })
        .then(() => {
          navigate("/products", { replace: true });
        })
        .catch(() => {
          setErrorSubmit("Unabled to edit the product!");
        })
        .finally(() => {
          setLoadingSubmit(false);
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

  // is promise in "pending"
  if (loading) {
    return (
      <div className="m-5">
        <Loader />
      </div>
    );
  }

  // if promise is "rejected"
  if (error) {
    return (
      <div className="alert alert-danger">
        <h3 className="text-center">{error}</h3>
        <h3 className="text-center">
          Product with id: "{productId}" is not found
        </h3>
      </div>
    );
  }

  return (
    <div className="pt-5 px-5">
      <h3>Edit product {" id to be changed"}</h3>
      <hr />
      {errorSubmit && (
        <div className="alert alert-danger">
          <h3>{errorSubmit}</h3>
        </div>
      )}
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="product-name" className="form-label">
            Product name:
          </label>
          <input
            disabled={loadingSubmit}
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
            disabled={loadingSubmit}
            type="number"
            value={formData.price}
            onChange={handleOnChange}
            className="form-control"
            id="product-price"
            name="price"
          />
          <div className="text-danger my-2">{formData.errors.price}</div>
        </div>
        <div className="d-flex gap-5 " style={{ width: "50%" }}>
          <button
            type="submit"
            className="btn btn-success flex-grow-1"
            disabled={loadingSubmit}
          >
            {loadingSubmit ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </>
            ) : (
              "Save"
            )}
          </button>
          {!loadingSubmit && (
            <Link to="/products" className="btn btn-secondary flex-grow-1">
              Cancel
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "./config";
import { Loader } from "./Loader";
import { useProduct } from "./hooks/use-product";

export const ProductPage = (props) => {
  const params = useParams();
  const { productId } = params;
  const { product, loading, error } = useProduct(productId);

  // if promise is "pending"
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

  const { name, id, price } = product;
  return (
    <div className="d-flex px-5 pt-5">
      <div className="flex-grow-1">
        <h2>{name}</h2>
        <hr />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "gray", height: "20rem", width: "20rem" }}
        >
          <h2>320 X 320</h2>
        </div>
      </div>
      <div className="flex-grow-1">
        <h3 className="text-end text-muted">${price}</h3>
      </div>
    </div>
  );
};

// const {loading , error, product} = useProduct(productId);
// Our first Custom hook:
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../config";

export const useProduct = (productId) => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get(BaseUrl + "/products/" + productId)
      .then((res) => {
        setProduct(res.data);
      })
      .catch(() => {
        setError("Couldn't find product 😥, retry later!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  return { loading, error, product };
};

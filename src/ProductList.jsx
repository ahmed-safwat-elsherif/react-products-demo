import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Loader } from "./Loader";
import axios from "axios";
import { BaseUrl } from "./config";

export default function ProductList(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function onIncrease(productId) {
    const allProducts = [...products];
    const index = allProducts.findIndex((item) => item.id === productId);
    const selectedProductItem = allProducts[index];
    selectedProductItem.price += 1;
    setProducts(allProducts);
  }

  const onDecrease = useCallback(
    (productId) => {
      const allProducts = [...products];
      const index = allProducts.findIndex((item) => item.id === productId);
      allProducts[index].price -= 1;
      setProducts(allProducts);
    },
    [products]
  );

  function onDelete(productId) {
    let allProducts = [...products];
    allProducts = allProducts.filter((product) => product.id !== productId);
    setProducts(allProducts);
  }

  useEffect(() => {
    /**
     *
     */
    // using fetch "Web api"
    // setLoading(true);
    // setError("");
    // const result = fetch("http://localhost:3001/product");
    // console.log(result);
    // result is a promise :
    // promise -> object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
    // promise has three statuses :
    /**
     * 1- "pending" => loading -> the data is being fetched
     * 2- "fulfilled" => success -> data is fetched
     * 3- "rejected" => error -> request is reject .. throw an error
     */
    // const response = result.then((data) => data.json());
    // console.log(response);
    // response
    //   .then((data) => {
    //     console.log(data);
    //     setProducts(data);
    //   })
    //   .catch(() => {
    //     setError("Couldn't find products 😥, retry later!");
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });

    // using axios
    setLoading(true);
    setError("");
    axios
      .get(BaseUrl + "/products")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Couldn't find products 😥, retry later!"))
      .finally(() => setLoading(false));
  }, []); // the best way to call a backend -> as it runs only once after the component mounted

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
      </div>
    );
  }

  // if promise is "fullfilled"
  return (
    <div className="px-3">
      <h3>Product Listing:</h3>
      {!products.length ? (
        <div>
          <h3 className="text-muted text-center">No Products "Empty"</h3>
        </div>
      ) : (
        <ul style={{ listStyle: "none" }} className="d-flex gap-4 flex-wrap">
          {products
            .sort((a, b) => +a.price - Number(b.price))
            .map(({ id, name, price }) => (
              <li
                key={id}
                className="card"
                style={{ maxWidth: "18rem", minWidth: "15rem" }}
              >
                <div className="p-2">
                  <h4>{name}</h4>
                  <h5 className="text-end text-muted">${price}</h5>
                </div>
                <hr />
                <div className="d-flex gap-3 px-3">
                  <button
                    className="btn flex-grow-1 btn-primary"
                    onClick={() => onIncrease(id)}
                  >
                    [+]
                  </button>
                  <button
                    className="btn flex-grow-1 btn-danger"
                    onClick={() => onDecrease(id)}
                  >
                    [-]
                  </button>
                </div>
                <hr />

                <Link to={`/products/${id}`} className="btn btn-info mx-3">
                  Go To page
                </Link>
                <hr />
                <Link to={`/edit-product/${id}`} className="btn btn-link mx-3">
                  Edit Product
                </Link>
                <button
                  className="btn btn-danger mx-3 mb-3"
                  onClick={() => onDelete(id)}
                >
                  [X]
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

import { Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import { Navbar } from "./Navbar";
import { ProductPage } from "./ProductPage";
import { AddProduct } from "./AddProduct";
import { EditProduct } from "./EditProduct";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="about" element={<h1>About page</h1>} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:productId" element={<ProductPage />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product/:productId" element={<EditProduct />} />
        <Route path="*" element={<h1>404 page is not found </h1>} />
      </Routes>
    </div>
  );
}

export default App;

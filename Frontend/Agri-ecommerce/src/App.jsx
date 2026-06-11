// 
// 
import { Routes, Route } from "react-router-dom";

import Navbar from "./Component/Navbar";

import Home from "./pages/Home";
import Products from "./Component/Product";
import ProductDetails from "./Component/ProductDetails";
import Wishlist from "./Component/Whishlist";
// import "./Component/ About"
// contact

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={<Products />}
        />

        {/* Product Details */}
        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />
        <Route
  path="/wishlist"
  element={<Wishlist />}
/>

      </Routes>
    </>
  );
};

export default App;
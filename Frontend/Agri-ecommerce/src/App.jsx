// 
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./Component/Product";
import ProductDetails from "./Component/ProductDetails";

const App = () => {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Products list */}
      <Route path="/products" element={<Products />} />

      {/* Single product details */}
      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>
  );
};

export default App;
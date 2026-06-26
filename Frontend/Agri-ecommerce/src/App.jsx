// 
// 
import { Routes, Route } from "react-router-dom";

import Navbar from "./Component/Navbar";

import Home from "./pages/Home";
import Products from "./Component/Product";
import ProductDetails from "./Component/ProductDetails";
import Wishlist from "./Component/Whishlist";
import Register from "./Component/Register";
import Login from "./Component/Login";
import Profile from "./Component/Profile";
import EditProfile from "./Component/EditProfile";
import Orders from "./Component/Orders";
import Cart from "./Component/Cart";
import Checkout from "./Component/Checkout Page";
import OrderSuccess from "./Component/OrderSuccess";
import MyOrder from "./Component/MyOrders";
import OrderDetails from "./Component/OrderDetails";
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
<Route
path="/register"
element={<Register/>}
/>
<Route path ="/login"
element ={<Login />}
/>
<Route path="/profile" element={<Profile />} />
<Route path="/edit-Profile" element={<EditProfile />} />
<Route path="/orders" element={<Orders />} />
<Route path="/cart"element={<Cart />}/>
<Route path="/checkout" element ={<Checkout Page/>}/>
<Route path="/order-success" element ={<OrderSuccess Page/>}/>
<Route path="/My-Orders" element ={<MyOrder/>}/>
<Route path="/order/:id" element ={<OrderDetails/>}/>






      </Routes>
    </>
  );
};

export default App;
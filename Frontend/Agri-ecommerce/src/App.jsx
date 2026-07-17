// 
// User Side //
import { Routes, Route ,useLocation} from "react-router-dom";
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
import OrderDetails from "./Component/OrderDetails";
import { useEffect } from "react";
import socket from "./Socket/socket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyOTP from "./Pages/VerifyOTP";
import ResetPassword from "./Pages/ResetPassword";
import Company from "./pages/Company";
import CompanyProfile from "./pages/CompanyProfile";
import Certifications from "./pages/Certifications";
import OurTeam from "./pages/OurTeam";
import Contact from "./pages/Contact";
// Admin Side //
import Dashboard from "./Admin/Pages/Dashboard";
import ProtectedAdminRoute from "./Admin/ProtectedAdminRoute";
import AdminLayout from "./Admin/AdminLayout";
import AdminProducts from "./Admin/Pages/Products";
import AddProduct from "./Admin/Pages/AddProduct";
import EditProduct from "./Admin/Pages/EditProduct";
import OrdersAdmin from "./Admin/Pages/OrdersAdmin";
import OrderDetailsAdmin from "./Admin/Pages/OrderDetailsAdmin";
import Customers from "./Admin/Pages/Customers";
import CustomerDetails from "./Admin/Pages/CustomerDetails";


const App = () => {
 useEffect(() => {

  const joinUser = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.id) {

      socket.emit("join-user", user.id);

      console.log("👤 Joined:", user.id);

    }

  };

  joinUser();

  window.addEventListener("storage", joinUser);

  return () => {

    window.removeEventListener("storage", joinUser);

  };

}, []);
useEffect(() => {

  console.log("🎧 Listening for order-status...");

  const handleOrderStatus = (data) => {

    console.log("📦 RECEIVED:", data);

    toast.info(data.message, {
      position: "top-right",
      autoClose: 5000,
    });

  };

  socket.on("order-status", handleOrderStatus);

  return () => {

    socket.off("order-status", handleOrderStatus);

  };

}, []);
useEffect(() => {

  socket.on("order-status", (notification) => {

  console.log("📦 RECEIVED:", notification);

  toast.info(notification.message, {

    position: "top-right",

    autoClose: 5000

  });

});

  socket.on("disconnect", (reason) => {

    console.log("❌ Disconnected:", reason);

  });

  socket.on("connect_error", (err) => {

    console.log("🚨 Socket Error:", err.message);

  });

  return () => {

    socket.off("connect");
    socket.off("disconnect");
    socket.off("connect_error");

  };

}, []);
useEffect(() => {

  socket.on("welcome", (data) => {

    console.log("WELCOME:", data);

  });

  return () => {

    socket.off("welcome");

  };

}, []);
  const location = useLocation();

const isAdminRoute =
  location.pathname.startsWith("/admin");
  return (
    <>
     { !isAdminRoute && <Navbar />}

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
<Route path="/order/:id" element ={<OrderDetails/>}/>
<Route
path="/forgot-password"
element={<ForgotPassword/>}
/>

<Route
path="/verify-otp"
element={<VerifyOTP/>}
/>

<Route
path="/reset-password"
element={<ResetPassword/>}
/>
<Route path="/about/company" element={<Company />} />
<Route path="/about/profile" element={<CompanyProfile />} />
<Route path="/about/certifications" element={<Certifications />} />
<Route
path="/about/team"
element={<OurTeam/>}
/>
<Route path="/contact" element={<Contact />} />

//Admin part

<Route
path="/admin"
element={
<ProtectedAdminRoute>
<AdminLayout/>
</ProtectedAdminRoute>
}
>

<Route
index
element={<Dashboard/>}
/>

<Route
path="dashboard"
element={<Dashboard/>}
/>

<Route
path="products"
element={<AdminProducts/>}
/>

<Route
path="orders"
element={<Orders/>}
/>

{/* <Route
path="customers"
element={<Customers/>}
/>

<Route
path="reports"
element={<Reports/>}
/>

<Route
path="settings"
element={<Settings/>}
/>

<Route
path="add-product"
element={<AddProduct/>}
/> */}
 <Route
    path="/admin/products/add"
    element={<AddProduct />}
/>

</Route>

<Route
  path="/admin/products/edit/:id"
  element={<EditProduct />}
/>
<Route
  path="/admin/ordersAdmin"
  element={<OrdersAdmin />}
/>
<Route
    path="/admin/ordersAdmin/:id"
    element={<OrderDetailsAdmin/>}
/>
<Route
  path="/admin/customers"
  element={<Customers />}
/>

<Route
  path="/admin/customers/:id"
  element={<CustomerDetails />}
/>
      </Routes>
      <ToastContainer
    position="top-right"
    autoClose={5000}
    newestOnTop
    closeOnClick
    pauseOnHover
  />
    </>
  );
};

export default App;
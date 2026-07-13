
const express = require("express");
const dotenv=require("dotenv");
const pool =require("./database/db");

const cors =require("cors");
dotenv.config();
const app = express();
const categoryRoutes=require("./route/categoryRoutes");
const productRoutes =require("./route/productRoutes");
const userRoutes=require("./route/UserRoute");
const cartRoute =require("./route/cartRoute");
const paymentRoutes =require("./route/paymentRoute");
const orderRoutes =require("./route/OrderRoutes");
const analyticsRoutes =require("./route/AnalyticsRoute");
app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));
app.use("/api/products",productRoutes);
app.use("/api/user",userRoutes);
app.use( "/api/cart",  cartRoute);
app.use("/api/payment",paymentRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/analytics", analyticsRoutes);
const PORT = process.env.PORT || 5000;
app.get("/",(req,res)=>{ 
    console.log('server is running')     
    res.send("Backend is running");
});

// app.get('/db-config',async(req,res)=>{
//     const result = await pool.query()
// })
// app.use("/category",categoryRoutes);
// app.use("/product",productRoutes);
app.use("/api/categories",categoryRoutes);
app.use("/uploads",express.static("uploads"));

app.listen(PORT,()=>{
    console.log(`Server is running ${PORT} `);
});


const express = require("express");
const dotenv=require("dotenv");
const pool =require("./database/db");

const cors =require("cors");
dotenv.config();
const app = express();
const categoryRoutes=require("./route/categoryRoutes");
const productRoutes =require("./route/productRoutes");

app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));
app.use("/api/products",productRoutes);

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

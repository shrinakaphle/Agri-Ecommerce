
const express = require("express");
const dotenv=require("dotenv");
const pool =require("./database/db");
const http = require("http");
const { Server } = require("socket.io");
const cors =require("cors");
dotenv.config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const categoryRoutes=require("./route/categoryRoutes");
const productRoutes =require("./route/productRoutes");
const userRoutes=require("./route/UserRoute");
const cartRoute =require("./route/cartRoute");
const paymentRoutes =require("./route/paymentRoute");
const orderRoutes =require("./route/OrderRoutes");
const analyticsRoutes =require("./route/AnalyticsRoute");
const notificationRoutes=require("./route/NotificationRoute");
app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));
app.use("/api/products",productRoutes);
app.use("/api/user",userRoutes);
app.use( "/api/cart",  cartRoute);
app.use("/api/payment",paymentRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notification",notificationRoutes);

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

const io = new Server(server, {

  cors: {

    origin: "http://localhost:5173",

    methods: ["GET", "POST"]

  }

});
io.on("connection", (socket) => {

  console.log("✅ User Connected:", socket.id);
  socket.emit("welcome", {
    message: "Hello Client"
  });


  // ===========================
  // ADMIN ROOM
  // ===========================

  socket.on("join-admin", () => {

    socket.join("admin");

    console.log("👑 Admin Joined:", socket.id);

  });

  // ===========================
  // CUSTOMER ROOM (We'll use later)
  // ===========================

  socket.on("join-user", (userId) => {

    socket.join(`user-${userId}`);

    console.log(`👤 User ${userId} Joined`);

  });

  socket.on("disconnect", () => {

    console.log("❌ User Disconnected:", socket.id);

  });

});

app.set("io", io);

server.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
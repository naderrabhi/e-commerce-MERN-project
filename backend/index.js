const express = require('express')
const connectDB = require("./config/connectDB")

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

const app = express()


require('dotenv').config()
connectDB()
app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/products",productRoute)
app.use("/api/carts",cartRoute)
app.use("/api/orders",orderRoute)


const port = process.env.PORT || 5000
app.listen(port, ()=> {console.log("server is running!")})
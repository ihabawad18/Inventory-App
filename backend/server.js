const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require( 'path');
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const app = express();


// MIDDLEWARES

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

// ROUTES MIDDLEWARES

app.use("/api/users",userRoute);

app.use("/api/products",productRoute);

// Error Middleware
app.use(errorHandler);

// Connect to DB and start server

const PORT = process.env.PORT || 5000;
mongoose.connect("mongodb://localhost:27017").then(
    ()=>{
        app.listen(PORT,()=>{
            console.log(`Server Running on port ${PORT}`);
        })
    }
).catch((err)=>{
    console.log(err);
})
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const PORT =process.env.PORT || 4000;
const authRouter = require("./routers/authRoute");
const productRouter = require("./routers/productRoute");
const blogRouter = require("./routers/blogRoute");
const categoryRouter = require("./routers/prodcategoryRoute");
const blogCatRouter = require("./routers/blogCatRoute");
const brandRouter = require("./routers/brandRoute");
const couponRouter = require("./routers/couponRoute");


const morgan = require("morgan");
dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogCatRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>{
    console.log(`Server is running at PORT ${PORT}`);
});
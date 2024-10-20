const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const database = require("./config/database");
const cloudinary = require("./config/cloudinary");
const authRoutes = require("./router/Auth");
const profileRoutes = require("./router/Profile");
const productRoutes = require("./router/Product");
const cartRoutes = require("./router/Cart");
const wishlistRoutes = require("./router/Wishlist");
const addressRoutes = require("./router/Address");
const orderRoutes = require("./router/Order");
const paymentRoutes = require("./router/Payment");
const adminRoutes = require("./router/Admin");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/admin", adminRoutes);

database.connect();
cloudinary.connect();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on ${port} port`);
});

app.get("/", (req, res) => {
  res.send("<h1>hello jee kaise ho saare</h1>");
});

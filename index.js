const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const multer = require("multer");
const productRoute = require("./routes/product");
const fs = require("fs");
dotenv.config();
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("connected to mongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

//app.use("/public", express.static("file-storage"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {

  try {
    return res.status(200).json("file uploaded succesfully");
  } catch (err) {
    console.log(err);
  }
});

app.use(function (err, req, res, next) {
  console.log("This is the invalid field ->", err.field);
  next(err);
});

app.use("/api/product", productRoute);

app.listen(8800, () => {
  console.log("back end runing");
});

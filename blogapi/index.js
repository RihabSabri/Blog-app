const express = require("express");
const app = express();
const router = require("./routers/post");
const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const { VerifyToken } = require("./middleware/tokenVerify");
require("dotenv").config();
const connectToDb = require("./db/connect");
app.use(express.json());
const cors = require("cors");
const multer = require("multer");
const path = require("path");

//*************************ROUTERS***********************************//
app.use(
  cors({
    origin: "*",
  }) //DON'T FORGET TO CHNAGE THIS BEFORE DEP
);
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/api/v1/posts", router);
app.use("/auth", authRouter);
app.use("/users", VerifyToken, userRouter);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  res.status(201).json("file has been uploaded");
});
//******************DB CONNECTION + STARTING SERVER**************//
const PORT = 5000 || process.env.PORT;
const URL = process.env.MONGO_URI;
const start = async () => {
  try {
    await connectToDb(URL);
    app.listen(PORT, () => {
      console.log(`Server is listening on Port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

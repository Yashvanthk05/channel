const express = require("express");
const cookieParser = require("cookie-parser");
const connectToDB = require("./v1/utils/db");
const authRoute = require("./v1/routes/auth.route");
const blogRouter = require("./v1/routes/blog.route");

const app = express();

connectToDB();

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
});

app.use(express.static("./dist"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", blogRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.sendFile("index.html");
});

app.listen(PORT, (req, res) => {
  console.log(`Server Listening on Port ${PORT}`);
});

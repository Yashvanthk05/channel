const express = require("express");
const cookieParser = require("cookie-parser");
const connectToDB = require("./v1/utils/db");
const authRoute = require("./v1/routes/auth.route");
const blogRouter = require("./v1/routes/blog.route");
const path = require("path");

const app = express();

connectToDB();

app.use(express.static(path.join(__dirname,"dist")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", blogRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, (req, res) => {
  console.log(`Server Listening on Port ${PORT}`);
});

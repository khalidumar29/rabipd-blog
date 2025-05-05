import express from "express";
import path from "path";
import cors from "cors";
import userRoute from "./routes/user.js";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: true }));

// Database connec
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Databse successfully connected");
  })
  .catch((e) => {
    console.log(e);
  });

// Routes
app.get("/", (req, res) => {
  return res.render("home");
});
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import { Router } from "express";
import User from "../models/user.js";
import { createTokenForUser } from "../services/authenticate.js";

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(req.body);

  const user = await User.create({
    fullName,
    email,
    password,
  });
  console.log(user);

  return res.redirect("/");
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User.matchPassword(email, password);
    const token = createTokenForUser(user);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "incorrect email or password",
    });
  }
});

export default router;

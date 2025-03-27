import { Router } from "express";
import bcrypt from "bcrypt";

const router = Router();
import User from "../models/user.js";

// list our routes
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up");
});

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (userInDatabase) {
    return res.send("Username already taken.");
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.send(`Thanks for signing up ${user.username}`);

  res.send("Form submission accepted!");
});

export default router;

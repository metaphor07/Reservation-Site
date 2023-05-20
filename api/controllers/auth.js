import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const checkPass = await bcrypt.compare(req.body.password, user.password);
    if (!checkPass) return next(createError(400, "Invalid email & password!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SEC_KEY
    );

    const { password, isAdmin, ...info } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...info }, isAdmin });
  } catch (err) {
    next(err);
  }
};

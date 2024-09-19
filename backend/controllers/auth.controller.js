import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  const { Username, Email, Password } = req.body;
  const hashedPassword = bcryptjs.hashSync(Password, 10);
  const newUser = new User({
    username: Username,
    email: Email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "user added" });
  } catch (error) {
    next(error);
  }
};

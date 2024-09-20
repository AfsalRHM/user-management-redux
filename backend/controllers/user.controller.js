import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({
    message: "API is working!",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params["id"]) {
    return next(errorHandler(401, "You can only update you account"));
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilepicture: req.body.profilepicture,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params["id"]) {
    return next(errorHandler(401, "You can only delete your account"));
  }
  try {
    const data = await User.findByIdAndDelete(req.params["id"]);
    if (data) {
      res.status(200).json("User has been deleted");
    }
  } catch (error) {
    next(error);
  }
};

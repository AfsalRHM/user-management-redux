import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const fetchUsers = async (req, res) => {
  try {
    const users = await User.find({ is_admin: false });

    res.status(200).json(users);
  } catch (error) {}
};

export const editSave = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Success", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" }); // Send error response
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result) {
      res.status(200).json({ message: "User Deleted" });
    }
  } catch (error) {
    console.error("Error Deleting user:", error);
    res.status(500).json({ message: "Internal server error" }); 
  }
};

export const adminAddUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      is_admin: false
    });
    const updatedUser = await newUser.save();
    res.status(200).json({message: "user Added", updatedUser})
  } catch (error) {
    console.error("Error Deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

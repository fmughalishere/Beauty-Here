import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id,
    });

  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({ success: false, message: "Error during login process." });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      token,
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id
    });

  } catch (error) {
    console.log("Registration Error:", error);
    res.status(500).json({ success: false, message: "Error during registration process." });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "Name is required for update." });
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name },
      { new: true, select: "-password" }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: "Profile updated successfully!",
      user: updatedUser
    });

  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ success: false, message: 'Server error during update' });
  }
};

const uploadAvatar = async (req, res) => {
  const { userId } = req; 

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded." });
  }

  const filename = req.file.filename;

  try {
    await userModel.findByIdAndUpdate(userId, { avatar: filename });

    res.json({ success: true, message: "Avatar uploaded successfully!", filename });

  } catch (error) {
    console.error("Avatar upload failed:", error);
    res.status(500).json({ success: false, message: "Server error during avatar upload." });
  }
};

export {
  loginUser,
  registerUser,
  updateUser,
  uploadAvatar
};

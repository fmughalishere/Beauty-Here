import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import userModel from '../models/userModel.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();

    let user = await userModel.findOne({ email });

    if (!user) {
      user = new userModel({
        name,
        email,
        avatar: picture,
        password: `google-user-${Date.now()}`
      });
      await user.save();
    }

    const authToken = createToken(user._id);

    res.json({
      success: true,
      token: authToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ success: false, message: "Google authentication failed" });
  }
};

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

    if (user.password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    } else {
        return res.status(401).json({ success: false, message: 'Please login using your Google account.' });
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
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
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.log("Registration Error:", error);
    res.status(500).json({ success: false, message: "Error during registration process." });
  }
};

const updateUser = async (req, res) => {
  const userId = req.user.id;
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
  const userId = req.user.id;

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded." });
  }

  // Store the avatar as a base64 data URI directly in MongoDB instead of
  // on local disk - serverless hosts don't offer a persistent filesystem.
  const avatarDataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

  try {
    await userModel.findByIdAndUpdate(userId, { avatar: avatarDataUri });

    res.json({ success: true, message: "Avatar uploaded successfully!", avatar: avatarDataUri });

  } catch (error) {
    console.error("Avatar upload failed:", error);
    res.status(500).json({ success: false, message: "Server error during avatar upload." });
  }
};

export {
  loginUser,
  registerUser,
  updateUser,
  uploadAvatar,
  googleLogin
};

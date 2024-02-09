import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  var salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User Not Found"));
    }
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials!!"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.Jwt_SECRET);
    const originalUser = { ...validUser.toObject() };
    delete originalUser.password;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(originalUser);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.Jwt_SECRET);
      const originalUser = { ...user.toObject() };
      delete originalUser.password;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(originalUser);
    } else {
      const generateddPAssword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generateddPAssword, 10);
      const userName =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);
      const Email = req.body.email;
      const Avatar = req.body.photo;
      const newUser = new User({
        username: userName,
        email: Email,
        password: hashedPassword,
        avatar: Avatar,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.Jwt_SECRET);
      const originalUser = { ...validUser.toObject() };
      delete originalUser.password;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(originalUser);
    }
  } catch (error) {
    next(error);
  }
};

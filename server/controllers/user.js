import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import UserModal from "../models/user.js";

dotenv.config();
const secret = process.env.SECRET;

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const getAccountDetails = async (req, res) => {
  console.log(req.params)
  const { email } = req.params;
  console.log(email);

  try {
    const user = await UserModal.findOne({ email });

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const editAccount = async (req, res) => {
  const { name, imageUrl, email } = req.body;
  console.log(req.body);
  console.log(name);
  console.log(imageUrl);
  console.log("editing");

  if (!req.userId) {
    console.log("Unatuhtendiacted");
    return res.json({ message: "Unauthenticated" });
  }

  try {
    const user = await UserModal.findOne({ email });
    console.log("i am here");
    user.name = name;
    user.imageUrl = imageUrl;

    const updatedUser = await UserModal.findByIdAndUpdate(user._id, user, {
      new: true,
    });
    console.log("i am here 2");
    console.log(updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

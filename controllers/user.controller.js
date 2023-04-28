import jwt from "jsonwebtoken";

import { createUser, findUserByUsername } from "../models/user/user.model.js";
import validateUserInfo from "../utils/validateUser.js";
import { comparePassword } from "../utils/bcrypt.js";

export const signupUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const validInfo = validateUserInfo(username, password);
    if (validInfo)
      return res.status(400).json({ success: false, message: validInfo });
    const userExists = await findUserByUsername(username);
    if (userExists)
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    await createUser(username, password);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const validInfo = validateUserInfo(username, password);
    if (validInfo)
      return res.status(400).json({ success: false, message: validInfo });
    const user = await findUserByUsername(username);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Wrong username or password" });
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res
        .status(404)
        .json({ success: false, message: "Wrong username or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

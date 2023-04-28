import User from "./user.schema.js";
import { hashPassword } from "../../utils/bcrypt.js";

export const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

export const findUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
};

export const createUser = async (username, password) => {
  const hashedPassword = await hashPassword(password);
  const newUser = { username, password: hashedPassword };
  const user = await User.create(newUser);
  return user;
};

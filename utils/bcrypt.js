import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  const hashedPassword = bcrypt.hash(password, 12);
  return hashedPassword;
};

export const comparePassword = (password, hashedPassword) => {
  const isMatch = bcrypt.compare(password, hashedPassword);
  return isMatch;
};

import jwt from "jsonwebtoken";
import { findUserById } from "../models/user/user.model.js";

export const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders?.split(" ")[1];
  if (!token)
    return res.status(400).json({ success: false, message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await findUserById(userId);
    if (!user)
      return res.status(400).json({ success: false, message: "Unauthorized" });
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: "Unauthorized" });
  }
};

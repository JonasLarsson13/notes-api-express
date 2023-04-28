import express from "express";
import notesRoutes from "./notes.routes.js";
import userRoutes from "./user.routes.js";

const api = express.Router();

api.use("/notes", notesRoutes);
api.use("/user", userRoutes);

export default api;

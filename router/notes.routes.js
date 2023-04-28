import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createNote,
  deleteNote,
  getAllNotes,
  searchNotes,
  updateNote,
} from "../controllers/notes.controller.js";
import { checkIfNoteBelongsToUser } from "../middleware/note.middleware.js";

const notesRoutes = express.Router();

notesRoutes.get("/", authMiddleware, getAllNotes);
notesRoutes.post("/", authMiddleware, createNote);
notesRoutes.put(
  "/:noteId",
  authMiddleware,
  checkIfNoteBelongsToUser,
  updateNote
);
notesRoutes.delete(
  "/:noteId",
  authMiddleware,
  checkIfNoteBelongsToUser,
  deleteNote
);
notesRoutes.get("/search", authMiddleware, searchNotes);

export default notesRoutes;

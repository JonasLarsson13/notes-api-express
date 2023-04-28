import { getSingleNoteById } from "../models/notes/notes.model.js";

export const checkIfNoteBelongsToUser = async (req, res, next) => {
  const noteId = req.params.noteId;
  const userId = req.userId;
  try {
    const note = await getSingleNoteById(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.createdBy !== userId)
      return res.status(400).json({ message: "Unauthorized" });
    req.noteId = noteId;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

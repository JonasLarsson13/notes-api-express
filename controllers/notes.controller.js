import {
  getAllNotesByUserId,
  createNoteForUser,
  searchNotesByTitle,
  updateNoteForUser,
  deleteNoteForUser,
} from "../models/notes/notes.model.js";
import validateNoteInputs from "../utils/validateNote.js";

export const getAllNotes = async (req, res) => {
  const userId = req.userId;
  try {
    const notes = await getAllNotesByUserId(userId);
    return res.status(200).json({ success: true, data: notes });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const createNote = async (req, res) => {
  const userId = req.userId;
  const { title, text } = req.body;
  try {
    const validNoteInputs = validateNoteInputs(title, text);
    if (validNoteInputs)
      return res.status(400).json({ success: false, message: validNoteInputs });
    const note = await createNoteForUser(userId, title, text);
    const newNoteObject = {
      _id: note._id,
      title: note.title,
      text: note.text,
      createdAt: note.createdAt,
    };
    return res.status(200).json({ success: true, data: newNoteObject });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateNote = async (req, res) => {
  const noteId = req.noteId;
  const { title, text } = req.body;
  try {
    const validNoteInputs = validateNoteInputs(title, text);
    if (validNoteInputs)
      return res.status(400).json({ success: false, message: validNoteInputs });
    const note = await updateNoteForUser(noteId, title, text);
    return res.status(200).json({ success: true, data: note });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteNote = async (req, res) => {
  const noteId = req.noteId;
  try {
    await deleteNoteForUser(noteId);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const searchNotes = async (req, res) => {
  const userId = req.userId;
  const searchQuery = req.query.title;
  try {
    const notes = await searchNotesByTitle(userId, searchQuery);
    return res.status(200).json({ success: true, data: notes });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

import Notes from "./notes.schema.js";
import { format } from "date-fns";
import { sv } from "date-fns/locale/index.js";

export const getSingleNoteById = async (noteId) => {
  const note = await Notes.findById(noteId);
  return note;
};

export const getAllNotesByUserId = async (userId) => {
  const notes = await Notes.find({ createdBy: userId }).select(
    "-__v -createdBy"
  );
  return notes;
};

export const createNoteForUser = async (userId, title, text) => {
  const note = await Notes.create({ title, text, createdBy: userId });
  return note;
};

export const updateNoteForUser = async (noteId, title, text) => {
  const currentDate = new Date();
  const currentDateSVFormat = format(currentDate, "yyyy-MM-dd HH:mm:ss", {
    locale: sv,
  });
  const note = await Notes.findOneAndUpdate(
    { _id: noteId },
    {
      title,
      text,
      modifiedAt: currentDateSVFormat,
    },
    { new: true }
  );
  return note;
};

export const deleteNoteForUser = async (noteId) => {
  await Notes.findOneAndDelete({ _id: noteId });
};

export const searchNotesByTitle = async (userId, search) => {
  const searchQuery = new RegExp(search, "i");
  const note = await Notes.find({
    createdBy: userId,
    title: searchQuery,
  }).select("-__v -createdBy");
  return note;
};

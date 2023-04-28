const validateNoteInputs = (title, text) => {
  if (!title || !text) return "Missing username or password";
  if (title.length > 50) return "The title can be no longer than 50 characters";
  if (text.length > 300) return "The text can be no longer than 300 characters";
  return;
};

export default validateNoteInputs;

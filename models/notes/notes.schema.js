import mongoose from "mongoose";
import { format } from "date-fns";
import { sv } from "date-fns/locale/index.js";

const notesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLenght: 50,
  },
  text: {
    type: String,
    required: false,
    maxLenght: 300,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: () => {
      const currentDate = new Date();
      return format(currentDate, "yyyy-MM-dd HH:mm:ss", { locale: sv });
    },
  },
  modifiedAt: {
    type: String,
    default: null,
  },
});

export default mongoose.model("Notes", notesSchema);

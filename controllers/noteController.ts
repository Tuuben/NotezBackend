import { deleteItem, addRow, getRows, updateRow } from "../utils/db";
import { Note } from "../models/note";

export const deleteNote = (id: string) => {
  try {
    deleteItem("notes", id);
  } catch (err) {
    console.error(err);
  }
};

export const addNote = (note: Note) => {
  try {
    const { id, location, content } = note;
    const updatedAt = new Date().toDateString();
    addRow("notes", ["id", "location", "content", "updated_at"], [id, location, content, updatedAt]);
  } catch (err) {
    console.error(err);
  }
};

export const updateNotes = (notes: Note[]) => {
  try {
    notes.forEach((note) => {
      const { id } = note;

      // TODO: Refactor
      const columns: string[] = Object.keys(note).filter((k) => k == "location" || k === "content");
      const values = columns.map((key) => note[key]);
      updateRow("notes", id, columns, values);
    });
  } catch (err) {
    console.error(err);
  }
};

export const getNotesFromDb = async () => {
  try {
    const res = await getRows("notes", ["*"]);
    const { rows } = res;
    return rows;
  } catch (err) {
    console.error(err);
  }
};

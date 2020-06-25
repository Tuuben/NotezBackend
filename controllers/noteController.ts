import { deleteItem, addRow, getRows, updateRow } from "../utils/db";
import { Note } from "../models/note";

export const deleteNote = (id: string) => {
  _deleteNoteFromDb(id);
};

export const addNote = (note: Note) => {
  _addCardToDb(note);
};

export const updateNotes = (notes: Note[]) => {
  _updateCardsToDb(notes);
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

const _deleteNoteFromDb = (cardId: string) => {
  try {
    deleteItem("notes", cardId);
  } catch (err) {
    console.error(err);
  }
};

const _addCardToDb = (note: Note) => {
  try {
    const { location, content } = note;
    addRow("notes", ["location", "content"], [location, content]);
  } catch (err) {
    console.error(err);
  }
};

const _updateCardsToDb = (notes: Note[]) => {
  try {
    notes.forEach((note) => {
      const { id, location, content } = note;
      updateRow("notes", id, ["location", "content"], [location, content]);
    });
  } catch (err) {
    console.error(err);
  }
};

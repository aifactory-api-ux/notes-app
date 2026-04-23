import { useState, useEffect } from 'react';
import { getNotes, createNote, deleteNote, getNote } from '../api';
import { NoteCreate } from '../types';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError(err.message || 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const createNoteFn = async (data: NoteCreate) => {
    setLoading(true);
    setError(null);
    try {
      await createNote(data);
      await loadNotes();
    } catch (err) {
      setError(err.message || 'Failed to create note');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteNoteFn = async (id: number) => {
    setDeletingId(id);
    setError(null);
    try {
      await deleteNote(id);
      await loadNotes();
    } catch (err) {
      setError(err.message || 'Failed to delete note');
      throw err;
    } finally {
      setDeletingId(null);
    }
  };

  const getNoteFn = async (id: number) => {
    try {
      return await getNote(id);
    } catch (err) {
      return null;
    }
  };

  return {
    notes,
    loading,
    error,
    createNote: createNoteFn,
    deleteNote: deleteNoteFn,
    deletingId,
    getNote: getNoteFn,
  };
};

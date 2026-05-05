import React, { useState, useEffect } from 'react';
import { getNotes, createNote as apiCreateNote, deleteNote as apiDeleteNote } from '../api/notes';

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const newNote = await apiCreateNote(data);
      setNotes((prev) => [newNote, ...prev]);
    } catch (err) {
      setError(err.message || 'Failed to create note');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    setDeletingId(id);
    setError(null);
    try {
      await apiDeleteNote(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete note');
      throw err;
    } finally {
      setDeletingId(null);
    }
  };

  return { notes, loading, error, createNote, deleteNote, deletingId };
};

export default useNotes;
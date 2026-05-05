const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:23001';

export const getNotes = async () => {
  const response = await fetch(`${API_BASE}/notes`);
  if (!response.ok) throw new Error('Failed to fetch notes');
  return response.json();
};

export const getNote = async (id) => {
  const response = await fetch(`${API_BASE}/notes/${id}`);
  if (!response.ok) throw new Error('Failed to fetch note');
  return response.json();
};

export const createNote = async (data) => {
  const response = await fetch(`${API_BASE}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create note');
  return response.json();
};

export const deleteNote = async (id) => {
  const response = await fetch(`${API_BASE}/notes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete note');
  return true;
};
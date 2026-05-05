import React from 'react';
import useNotes from './hooks/useNotes';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

function App() {
  const { notes, loading, error, createNote, deleteNote, deletingId } = useNotes();

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Notes App</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <NoteForm onSubmit={createNote} loading={loading} />
      <NoteList notes={notes} onDelete={deleteNote} deletingId={deletingId} />
    </div>
  );
}

export default App;
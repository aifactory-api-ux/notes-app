import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import { useNotes } from './hooks/useNotes';

function App() {
  const { notes, loading, error, createNote, deleteNote, deletingId } = useNotes();

  const handleCreateNote = async (data) => {
    await createNote(data);
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Notes App</h1>
      </header>
      <main className="app-main">
        <NoteForm onSubmit={handleCreateNote} loading={loading} />
        {error && <div className="error-message">{error}</div>}
        <NoteList notes={notes} onDelete={handleDeleteNote} deletingId={deletingId} />
      </main>
    </div>
  );
}

export default App;

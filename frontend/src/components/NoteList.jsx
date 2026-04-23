import NoteItem from './NoteItem';

const NoteList = ({ notes, onDelete, deletingId }) => {
  if (notes.length === 0) {
    return (
      <div className="note-list-empty">
        <p>No notes yet. Create your first note above!</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          deleting={deletingId === note.id}
        />
      ))}
    </div>
  );
};

export default NoteList;

import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onDelete, deletingId }) => {
  if (notes.length === 0) {
    return <p>No notes yet. Create one above!</p>;
  }

  return (
    <div>
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
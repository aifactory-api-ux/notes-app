import React from 'react';

const NoteItem = ({ note, onDelete, deleting }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>
      <h3>{note.title}</h3>
      {note.content && <p>{note.content}</p>}
      <small>Created: {new Date(note.created_at).toLocaleString()}</small>
      <br />
      <button onClick={() => onDelete(note.id)} disabled={deleting} style={{ marginTop: '5px' }}>
        {deleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default NoteItem;
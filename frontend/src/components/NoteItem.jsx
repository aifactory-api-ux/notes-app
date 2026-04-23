import { format } from 'date-fns';

const NoteItem = ({ note, onDelete, deleting }) => {
  return (
    <div className="note-item">
      <div className="note-item-header">
        <h3>{note.title}</h3>
        <span className="note-date">{format(new Date(note.created_at), 'PPp')}</span>
      </div>
      {note.content && <p className="note-content">{note.content}</p>}
      <button
        className="delete-btn"
        onClick={() => onDelete(note.id)}
        disabled={deleting}
      >
        {deleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default NoteItem;

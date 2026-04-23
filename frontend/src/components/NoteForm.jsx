import { useState } from 'react';
import { NoteCreate } from '../types';

const NoteForm = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const data: NoteCreate = { title: title.trim(), content: content.trim() || undefined };
    onSubmit(data);
    setTitle('');
    setContent('');
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        required
        minLength={1}
        maxLength={255}
      />
      <textarea
        placeholder="Note content (optional)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading || !title.trim()}>
        {loading ? 'Creating...' : 'Create Note'}
      </button>
    </form>
  );
};

export default NoteForm;

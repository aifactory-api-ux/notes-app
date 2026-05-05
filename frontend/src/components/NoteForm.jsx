import React, { useState } from 'react';

const NoteForm = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    try {
      await onSubmit({ title, content });
      setTitle('');
      setContent('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          style={{ marginRight: '10px' }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <textarea
          placeholder="Content (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
      </div>
      <button type="submit" disabled={loading} style={{ marginTop: '10px' }}>
        {loading ? 'Creating...' : 'Create Note'}
      </button>
    </form>
  );
};

export default NoteForm;
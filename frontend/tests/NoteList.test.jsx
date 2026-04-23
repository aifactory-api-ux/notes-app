import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import NoteList from '../src/components/NoteList';

describe('NoteList', () => {
  it('renders empty state when no notes', () => {
    render(<NoteList notes={[]} onDelete={vi.fn()} deletingId={null} />);
    expect(screen.getByText(/no notes yet/i)).toBeTruthy();
  });

  it('renders notes list', () => {
    const notes = [
      { id: 1, title: 'Note 1', content: 'Content 1', created_at: '2024-01-01T00:00:00' },
      { id: 2, title: 'Note 2', content: 'Content 2', created_at: '2024-01-02T00:00:00' },
    ];
    render(<NoteList notes={notes} onDelete={vi.fn()} deletingId={null} />);
    expect(screen.getByText('Note 1')).toBeTruthy();
    expect(screen.getByText('Note 2')).toBeTruthy();
  });

  it('renders empty content as undefined', () => {
    const notes = [{ id: 1, title: 'No Content Note', content: null, created_at: '2024-01-01T00:00:00' }];
    render(<NoteList notes={notes} onDelete={vi.fn()} deletingId={null} />);
    const noteItems = screen.getAllByText('No Content Note');
    expect(noteItems.length).toBe(1);
  });
});
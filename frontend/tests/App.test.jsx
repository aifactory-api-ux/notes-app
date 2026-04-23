import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

const mockNotes = [
  { id: 1, title: 'Note 1', content: 'Content 1', created_at: '2024-01-01T00:00:00' },
  { id: 2, title: 'Note 2', content: 'Content 2', created_at: '2024-01-02T00:00:00' },
];

vi.mock('../src/api', () => ({
  getNotes: vi.fn(() => Promise.resolve(mockNotes)),
  createNote: vi.fn(() => Promise.resolve({ id: 3, title: 'New Note', content: 'New content', created_at: '2024-01-03T00:00:00' })),
  deleteNote: vi.fn(() => Promise.resolve()),
  getNote: vi.fn(() => Promise.resolve(null)),
}));

vi.mock('../src/hooks/useNotes', () => ({
  useNotes: vi.fn(() => ({
    notes: mockNotes,
    loading: false,
    error: null,
    createNote: vi.fn(),
    deleteNote: vi.fn(),
    deletingId: null,
  })),
}));

describe('App', () => {
  it('renders app header', () => {
    render(<App />);
    expect(screen.getByText('Notes App')).toBeTruthy();
  });

  it('renders note form', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Note title')).toBeTruthy();
  });

  it('renders note list with notes', () => {
    render(<App />);
    expect(screen.getByText('Note 1')).toBeTruthy();
    expect(screen.getByText('Note 2')).toBeTruthy();
  });
});
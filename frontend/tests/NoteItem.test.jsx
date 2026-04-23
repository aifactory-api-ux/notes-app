import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import NoteItem from '../src/components/NoteItem';

describe('NoteItem', () => {
  const mockNote = {
    id: 1,
    title: 'Test Note',
    content: 'Test content',
    created_at: '2024-01-15T10:30:00',
  };

  it('renders note title', () => {
    render(<NoteItem note={mockNote} onDelete={vi.fn()} deleting={false} />);
    expect(screen.getByText('Test Note')).toBeTruthy();
  });

  it('renders note content', () => {
    render(<NoteItem note={mockNote} onDelete={vi.fn()} deleting={false} />);
    expect(screen.getByText('Test content')).toBeTruthy();
  });

  it('renders delete button', () => {
    render(<NoteItem note={mockNote} onDelete={vi.fn()} deleting={false} />);
    expect(screen.getByRole('button', { name: /delete/i })).toBeTruthy();
  });

  it('shows deleting state on button', () => {
    render(<NoteItem note={mockNote} onDelete={vi.fn()} deleting={true} />);
    expect(screen.getByRole('button', { name: /deleting/i })).toBeTruthy();
  });

  it('calls onDelete with note id', () => {
    const mockDelete = vi.fn();
    render(<NoteItem note={mockNote} onDelete={mockDelete} deleting={false} />);
    const button = screen.getByRole('button', { name: /delete/i });
    button.click();
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it('renders without content', () => {
    const noteNoContent = { ...mockNote, content: null };
    render(<NoteItem note={noteNoContent} onDelete={vi.fn()} deleting={false} />);
    expect(screen.getByText('Test Note')).toBeTruthy();
  });
});
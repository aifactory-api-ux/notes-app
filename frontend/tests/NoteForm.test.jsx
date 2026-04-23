import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteForm from '../src/components/NoteForm';

describe('NoteForm', () => {
  it('renders form elements', () => {
    render(<NoteForm onSubmit={vi.fn()} loading={false} />);
    expect(screen.getByPlaceholderText('Note title')).toBeTruthy();
    expect(screen.getByPlaceholderText('Note content (optional)')).toBeTruthy();
    expect(screen.getByRole('button', { name: /create note/i })).toBeTruthy();
  });

  it('allows entering title and content', async () => {
    const user = userEvent.setup();
    render(<NoteForm onSubmit={vi.fn()} loading={false} />);
    const titleInput = screen.getByPlaceholderText('Note title');
    const contentInput = screen.getByPlaceholderText('Note content (optional)');
    await user.type(titleInput, 'My Note Title');
    await user.type(contentInput, 'My note content');
    expect(titleInput.value).toBe('My Note Title');
    expect(contentInput.value).toBe('My note content');
  });

  it('submits form with data', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<NoteForm onSubmit={mockSubmit} loading={false} />);
    const titleInput = screen.getByPlaceholderText('Note title');
    await user.type(titleInput, 'Test Note');
    const button = screen.getByRole('button', { name: /create note/i });
    await user.click(button);
    expect(mockSubmit).toHaveBeenCalledWith({ title: 'Test Note', content: undefined });
  });

  it('clears inputs after submit', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<NoteForm onSubmit={mockSubmit} loading={false} />);
    const titleInput = screen.getByPlaceholderText('Note title');
    const contentInput = screen.getByPlaceholderText('Note content (optional)');
    await user.type(titleInput, 'Test Note');
    await user.type(contentInput, 'Content');
    const button = screen.getByRole('button', { name: /create note/i });
    await user.click(button);
    expect(titleInput.value).toBe('');
    expect(contentInput.value).toBe('');
  });

  it('disables button when loading', () => {
    render(<NoteForm onSubmit={vi.fn()} loading={true} />);
    expect(screen.getByRole('button', { name: /creating/i })).toBeDisabled();
  });

  it('disables button when title is empty', () => {
    render(<NoteForm onSubmit={vi.fn()} loading={false} />);
    const button = screen.getByRole('button', { name: /create note/i });
    expect(button).toBeDisabled();
  });
});
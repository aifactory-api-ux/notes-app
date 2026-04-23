import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNotes } from '../src/hooks/useNotes';

vi.mock('../src/api', () => ({
  getNotes: vi.fn(),
  createNote: vi.fn(),
  deleteNote: vi.fn(),
  getNote: vi.fn(),
}));

const mockApi = await import('../src/api');

describe('useNotes hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns initial state', () => {
    mockApi.getNotes.mockResolvedValue([]);
    const { result } = renderHook(() => useNotes());
    expect(result.current.notes).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('loads notes on mount', async () => {
    const notes = [{ id: 1, title: 'Test', content: 'Content', created_at: '2024-01-01' }];
    mockApi.getNotes.mockResolvedValue(notes);
    const { result } = renderHook(() => useNotes());
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });
    expect(mockApi.getNotes).toHaveBeenCalled();
  });
});
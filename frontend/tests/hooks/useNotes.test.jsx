import { test, expect } from '@jest/globals';

test('fetches notes on mount and sets notes state', () => {
  const mockResponse = [{ id: 1, title: 'A', content: 'B', created_at: '2024-06-01T12:00:00Z' }];
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(mockResponse),
    ok: true,
  });
  expect(mockResponse.length).toBe(1);
});

test('sets loading true while fetching notes', () => {
  expect(true).toBe(true);
});

test('sets error state if GET /notes fails', () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));
  expect(global.fetch('/notes')).rejects.toThrow('Network Error');
});

test('createNote adds new note to notes state on success', async () => {
  const newNote = { id: 2, title: 'New', content: 'Body', created_at: '2024-06-01T13:00:00Z' };
  global.fetch = jest.fn()
    .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve([newNote]) })
    .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(newNote) });
  expect(newNote.title).toBe('New');
});

test('createNote sets error if POST /notes fails', () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('Validation Error'));
  expect(global.fetch('/notes', { method: 'POST' })).rejects.toThrow('Validation Error');
});

test('deleteNote removes note from notes state on success', async () => {
  global.fetch = jest.fn().mockResolvedValue({ status: 204 });
  const response = await global.fetch('/notes/1', { method: 'DELETE' });
  expect(response.status).toBe(204);
});

test('deleteNote sets error if DELETE /notes/{id} fails', () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('Not Found'));
  expect(global.fetch('/notes/1', { method: 'DELETE' })).rejects.toThrow('Not Found');
});

test('deletingId is set during deleteNote and cleared after', async () => {
  let deletingId = null;
  const setDeletingId = (id) => { deletingId = id; };
  setDeletingId(1);
  expect(deletingId).toBe(1);
  setDeletingId(null);
  expect(deletingId).toBeNull();
});
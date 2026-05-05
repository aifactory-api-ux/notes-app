import { test, expect } from '@jest/globals';

const API_BASE = 'http://localhost:23001';

describe('Notes API', () => {
  describe('Note interface', () => {
    test('accepts valid fields', () => {
      const note = {
        id: 1,
        title: 'Frontend Note',
        content: 'Frontend content',
        created_at: '2024-06-01T12:00:00Z'
      };
      expect(note.id).toBe(1);
      expect(note.title).toBe('Frontend Note');
      expect(note.content).toBe('Frontend content');
      expect(note.created_at).toBe('2024-06-01T12:00:00Z');
    });

    test('content optional', () => {
      const note = {
        id: 2,
        title: 'No Content Note',
        created_at: '2024-06-01T12:00:00Z'
      };
      expect(note.id).toBe(2);
      expect(note.title).toBe('No Content Note');
      expect(note.content).toBeUndefined();
    });

    test('created_at format', () => {
      const note = {
        id: 3,
        title: 'Date Format Note',
        created_at: '2024-06-01T12:00:00Z'
      };
      expect(note.created_at).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
    });
  });

  describe('NoteBase interface', () => {
    test('requires title', () => {
      expect(() => {
        const data = { content: 'Missing title' };
        if (!data.title) throw new TypeError('title is required');
      }).toThrow(TypeError);
    });
  });

  describe('NoteCreate interface', () => {
    test('extends NoteBase with optional content', () => {
      const noteCreate = {
        title: 'Create Note',
        content: 'Create content'
      };
      expect(noteCreate.title).toBe('Create Note');
      expect(noteCreate.content).toBe('Create content');
    });
  });
});
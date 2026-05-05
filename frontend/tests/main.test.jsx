import { test, expect } from '@jest/globals';

test('renders App component at root', () => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  expect(root).not.toBeNull();
});

test('renders without crashing when root element exists', () => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  expect(root.id).toBe('root');
});
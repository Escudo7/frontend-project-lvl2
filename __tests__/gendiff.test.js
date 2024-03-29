import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getDiff from '../src/getDiff.js';

const currentPath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentPath);
const getPath = (fileName) => `${currentDir}/../__fixtures__/${fileName}`;

test('jsonDiffStylish', () => {
  const path1 = getPath('json1.json');
  const path2 = getPath('json2.json');
  const result = readFileSync(getPath('resultStylish'), 'utf8');

  expect(getDiff(path1, path2, 'stylish')).toBe(result);
});

test('yamlDiffStylish', () => {
  const path1 = getPath('yaml1.yml');
  const path2 = getPath('yaml2.yml');
  const result = readFileSync(getPath('resultStylish'), 'utf8');

  expect(getDiff(path1, path2, 'stylish')).toBe(result);
});

test('jsonDiffPlain', () => {
  const path1 = getPath('json1.json');
  const path2 = getPath('json2.json');
  const result = readFileSync(getPath('resultPlain'), 'utf8');

  expect(getDiff(path1, path2, 'plain')).toBe(result);
});

test('yamlDiffPlain', () => {
  const path1 = getPath('yaml1.yml');
  const path2 = getPath('yaml2.yml');
  const result = readFileSync(getPath('resultPlain'), 'utf8');

  expect(getDiff(path1, path2, 'plain')).toBe(result);
});

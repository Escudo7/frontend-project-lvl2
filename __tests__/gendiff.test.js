import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import yaml from 'js-yaml';
import genDiff from '../src/genDiff.js';

test('jsonDiff', () => {
  const currentPath = fileURLToPath(import.meta.url);
  const currentDir = dirname(currentPath);
  const getPath = (fileName) => `${currentDir}/../__fixtures__/${fileName}`;

  const content1 = JSON.parse(readFileSync(getPath('json1.json')));
  const content2 = JSON.parse(readFileSync(getPath('json2.json')));
  const result = readFileSync(getPath('result'), 'utf8');

  expect(genDiff(content1, content2)).toBe(result);
});

test('yamlDiff', () => {
  const currentPath = fileURLToPath(import.meta.url);
  const currentDir = dirname(currentPath);
  const getPath = (fileName) => `${currentDir}/../__fixtures__/${fileName}`;

  const content1 = yaml.load(readFileSync(getPath('yaml1.yml')), 'utf8');
  const content2 = yaml.load(readFileSync(getPath('yaml2.yml')), 'utf8');
  const result = readFileSync(getPath('result'), 'utf8');

  expect(genDiff(content1, content2)).toBe(result);
});

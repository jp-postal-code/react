import { expect, test } from '@jest/globals';
import { validatePostalCode } from '../../lib/validate-postal-code.js';

test('returns true', () => {
  expect(validatePostalCode('1000001')).toBe(true);
  expect(validatePostalCode('9999999')).toBe(true);
});

test('returns false', () => {
  expect(validatePostalCode('10000010')).toBe(false);
  expect(validatePostalCode('999999')).toBe(false);
  expect(validatePostalCode('aaaaaaa')).toBe(false);
  expect(validatePostalCode('100-0000')).toBe(false);
});

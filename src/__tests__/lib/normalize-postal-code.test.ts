import { expect, test } from '@jest/globals';
import { normalizePostalCode } from '../../lib/normalize-postal-code.js';

test('returns normalized postal code', () => {
  expect(normalizePostalCode('100-0000')).toBe('1000000');
  expect(normalizePostalCode('1000000')).toBe('1000000');
});

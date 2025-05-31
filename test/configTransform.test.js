import { test } from 'node:test';
import assert from 'node:assert/strict';

test('should merge config with defaults', () => {
  const defaultConfig = { currency: 'NGN', amount: 1000 };
  const userConfig = { amount: 2000 };

  const result = { ...defaultConfig, ...userConfig };

  assert.deepEqual(result, { currency: 'NGN', amount: 2000 });
});

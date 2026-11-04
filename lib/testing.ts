import { expect } from 'vitest';

/**
 * Run `fn` and fail if it takes longer than `maxMs`.
 * Vitest's own timeout can't interrupt synchronous code, so slow brute-force
 * solutions are caught by measuring the elapsed time directly.
 */
export function expectFast<T>(fn: () => T, maxMs = 1000): T {
  const start = performance.now();
  const result = fn();
  const elapsed = performance.now() - start;
  expect(
    elapsed,
    `took ${elapsed.toFixed(0)}ms, limit is ${maxMs}ms. This input is large enough that a brute-force approach is too slow.`,
  ).toBeLessThan(maxMs);
  return result;
}

/** Deterministic pseudo-random numbers (mulberry32) so large tests are reproducible. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

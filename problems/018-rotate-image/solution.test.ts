import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { rotate } from './solution';

function rotated(m: number[][]): number[][] {
  const copy = m.map((row) => [...row]);
  rotate(copy);
  return copy;
}

function sequential(n: number): number[][] {
  return Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => r * n + c));
}

describe('Rotate Image', () => {
  it('example 1: a 3x3 grid', () => {
    expect(rotated([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).toEqual([[7, 4, 1], [8, 5, 2], [9, 6, 3]]);
  });

  it('example 2: a 2x2 grid', () => {
    expect(rotated([[1, 2], [3, 4]])).toEqual([[3, 1], [4, 2]]);
  });

  it('example 3: a single cell stays as it is', () => {
    expect(rotated([[5]])).toEqual([[5]]);
  });

  it('a 4x4 grid (even size, no centre cell)', () => {
    expect(rotated([
      [5, 1, 9, 11],
      [2, 4, 8, 10],
      [13, 3, 6, 7],
      [15, 14, 12, 16],
    ])).toEqual([
      [15, 13, 2, 5],
      [14, 3, 4, 1],
      [12, 6, 8, 9],
      [16, 7, 10, 11],
    ]);
  });

  it('handles negative numbers and duplicates', () => {
    expect(rotated([[-1, -1, 0], [0, 7, -1], [7, 7, 0]])).toEqual([[7, 0, -1], [7, 7, -1], [0, -1, 0]]);
  });

  it('modifies the given array in place and returns nothing', () => {
    const m = [[1, 2], [3, 4]];
    const rows = [m[0], m[1]];
    const result = rotate(m);
    expect(result).toBeUndefined();
    expect(m).toEqual([[3, 1], [4, 2]]);
    expect(m[0]).toBe(rows[0]);
    expect(m[1]).toBe(rows[1]);
  });

  it('rotating four times gives back the original 5x5 grid', () => {
    const m = sequential(5);
    const original = m.map((row) => [...row]);
    for (let i = 0; i < 4; i++) rotate(m);
    expect(m).toEqual(original);
  });

  it('a 5x5 grid of sequential numbers', () => {
    const n = 5;
    const m = sequential(n);
    const expected = Array.from({ length: n }, (_, r) =>
      Array.from({ length: n }, (_, c) => (n - 1 - c) * n + r),
    );
    expect(rotated(m)).toEqual(expected);
  });

  it('a large 1000x1000 grid rotates quickly and correctly', () => {
    const n = 1000;
    const rand = seededRandom(48);
    const m = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => Math.floor(rand() * 2001) - 1000),
    );
    const original = m.map((row) => [...row]);
    expectFast(() => rotate(m), 1000);
    for (let r = 0; r < n; r += 37) {
      for (let c = 0; c < n; c++) {
        expect(m[r][c]).toBe(original[n - 1 - c][r]);
      }
    }
    for (let c = 0; c < n; c += 41) {
      for (let r = 0; r < n; r++) {
        expect(m[r][c]).toBe(original[n - 1 - c][r]);
      }
    }
  });
});

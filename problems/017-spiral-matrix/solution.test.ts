import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { spiralOrder } from './solution';

function grid(m: number, n: number): number[][] {
  return Array.from({ length: m }, (_, r) => Array.from({ length: n }, (_, c) => r * n + c));
}

describe('Spiral Matrix', () => {
  it('example 1: a 3x3 grid spirals into the centre', () => {
    expect(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
  });

  it('example 2: a wide 3x4 grid', () => {
    expect(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])).toEqual([
      1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7,
    ]);
  });

  it('example 3: a single column is read top to bottom', () => {
    expect(spiralOrder([[7], [9], [6]])).toEqual([7, 9, 6]);
  });

  it('a single cell', () => {
    expect(spiralOrder([[5]])).toEqual([5]);
  });

  it('a single row is read left to right', () => {
    expect(spiralOrder([[1, 2, 3, 4, 5]])).toEqual([1, 2, 3, 4, 5]);
  });

  it('a tall 4x3 grid ends with a partial inner column', () => {
    expect(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]])).toEqual([
      1, 2, 3, 6, 9, 12, 11, 10, 7, 4, 5, 8,
    ]);
  });

  it('a 2x2 grid', () => {
    expect(spiralOrder([[1, 2], [3, 4]])).toEqual([1, 2, 4, 3]);
  });

  it('a 4x4 grid has a 2x2 inner ring', () => {
    expect(spiralOrder(grid(4, 4).map((r) => r.map((v) => v + 1)))).toEqual([
      1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10,
    ]);
  });

  it('negative values and duplicates are returned as they are', () => {
    expect(spiralOrder([[-1, -1, 0], [0, -1, 2]])).toEqual([-1, -1, 0, 2, -1, 0]);
  });

  it('does not modify the input grid', () => {
    const g = [[1, 2, 3], [4, 5, 6]];
    spiralOrder(g);
    expect(g).toEqual([[1, 2, 3], [4, 5, 6]]);
  });

  it('large grid: 1000x1000 visits every cell once and follows the outer ring', () => {
    const m = 1000;
    const n = 1000;
    const rand = seededRandom(17);
    const g = grid(m, n);
    // shuffle values so the answer cannot be guessed from the layout
    const flat = g.flat();
    for (let i = flat.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [flat[i], flat[j]] = [flat[j], flat[i]];
    }
    const big = Array.from({ length: m }, (_, r) => flat.slice(r * n, (r + 1) * n));

    const out = expectFast(() => spiralOrder(big), 1000);

    expect(out).toHaveLength(m * n);
    expect([...out].sort((a, b) => a - b)).toEqual(Array.from({ length: m * n }, (_, i) => i));
    const ring: number[] = [
      ...big[0],
      ...big.slice(1).map((r) => r[n - 1]),
      ...[...big[m - 1]].slice(0, n - 1).reverse(),
      ...big.slice(1, m - 1).map((r) => r[0]).reverse(),
    ];
    expect(out.slice(0, ring.length)).toEqual(ring);
  });

  it('large non-square grid: 3 x 200000 is read as top row, then back along the bottom, then the middle', () => {
    const n = 200000;
    const g = [
      Array.from({ length: n }, (_, i) => i),
      Array.from({ length: n }, (_, i) => n + i),
      Array.from({ length: n }, (_, i) => 2 * n + i),
    ];
    const out = expectFast(() => spiralOrder(g), 1000);
    const expected = [
      ...g[0],
      g[1][n - 1],
      ...[...g[2]].reverse(),
      g[1][0],
      ...g[1].slice(1, n - 1),
    ];
    expect(out).toEqual(expected);
  });
});

import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { setZeroes } from './solution';

function run(grid: number[][]): number[][] {
  const copy = grid.map((row) => [...row]);
  setZeroes(copy);
  return copy;
}

describe('Set Matrix Zeroes', () => {
  it('example 1: a single zero in the middle clears its row and column', () => {
    expect(
      run([
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ]),
    ).toEqual([
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ]);
  });

  it('example 2: zeros in the first row clear their columns and the first row', () => {
    expect(
      run([
        [0, 1, 2, 0],
        [3, 4, 5, 2],
        [1, 3, 1, 5],
      ]),
    ).toEqual([
      [0, 0, 0, 0],
      [0, 4, 5, 0],
      [0, 3, 1, 0],
    ]);
  });

  it('example 3: a single cell without zero is unchanged', () => {
    expect(run([[5]])).toEqual([[5]]);
  });

  it('a single cell that is zero stays zero', () => {
    expect(run([[0]])).toEqual([[0]]);
  });

  it('a grid with no zeros is unchanged', () => {
    const grid = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    expect(run(grid)).toEqual(grid);
  });

  it('a zero in the first column clears that column and its row', () => {
    expect(
      run([
        [1, 2, 3],
        [0, 5, 6],
        [7, 8, 9],
      ]),
    ).toEqual([
      [0, 2, 3],
      [0, 0, 0],
      [0, 8, 9],
    ]);
  });

  it('zeros created during the update do not spread further', () => {
    expect(
      run([
        [1, 1, 1, 1],
        [1, 1, 1, 0],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
      ]),
    ).toEqual([
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 1, 1, 0],
    ]);
  });

  it('works on a single row and a single column', () => {
    expect(run([[1, 0, 3]])).toEqual([[0, 0, 0]]);
    expect(run([[1], [0], [3]])).toEqual([[0], [0], [0]]);
  });

  it('handles negative numbers and extreme values', () => {
    expect(
      run([
        [-2147483648, 2147483647, -1],
        [4, 0, -5],
        [6, 7, 8],
      ]),
    ).toEqual([
      [-2147483648, 0, -1],
      [0, 0, 0],
      [6, 0, 8],
    ]);
  });

  it('zeros in both the first row and first column clear both', () => {
    expect(
      run([
        [0, 1, 1],
        [1, 1, 1],
        [1, 1, 0],
      ]),
    ).toEqual([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]);
  });

  it('a zero everywhere turns into an all-zero grid', () => {
    expect(
      run([
        [0, 0],
        [0, 0],
      ]),
    ).toEqual([
      [0, 0],
      [0, 0],
    ]);
  });

  it('returns nothing and modifies the same array it was given', () => {
    const grid = [
      [1, 0],
      [1, 1],
    ];
    const rows = grid;
    const result = setZeroes(grid);
    expect(result).toBeUndefined();
    expect(grid).toBe(rows);
    expect(grid).toEqual([
      [0, 0],
      [1, 0],
    ]);
  });

  it('large grid (1000 x 1000) with a few scattered zeros finishes quickly', () => {
    const n = 1000;
    const rand = seededRandom(16);
    const zeroRows = new Set<number>();
    const zeroCols = new Set<number>();
    const grid: number[][] = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => 1 + Math.floor(rand() * 1000)),
    );
    for (let k = 0; k < 5; k++) {
      const r = Math.floor(rand() * n);
      const c = Math.floor(rand() * n);
      grid[r][c] = 0;
      zeroRows.add(r);
      zeroCols.add(c);
    }
    const original = grid.map((row) => [...row]);
    expectFast(() => setZeroes(grid), 500);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const expected = zeroRows.has(i) || zeroCols.has(j) ? 0 : original[i][j];
        if (grid[i][j] !== expected) {
          throw new Error(`cell (${i}, ${j}) is ${grid[i][j]}, expected ${expected}`);
        }
      }
    }
  });

  it('large grid (1000 x 1000) with many zeros finishes quickly', () => {
    const n = 1000;
    const rand = seededRandom(1616);
    const grid: number[][] = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => (rand() < 0.0005 ? 0 : 7)),
    );
    const zeroRows = new Set<number>();
    const zeroCols = new Set<number>();
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === 0) {
          zeroRows.add(i);
          zeroCols.add(j);
        }
      }
    }
    expectFast(() => setZeroes(grid), 500);
    let ok = true;
    for (let i = 0; i < n && ok; i++) {
      for (let j = 0; j < n; j++) {
        const expected = zeroRows.has(i) || zeroCols.has(j) ? 0 : 7;
        if (grid[i][j] !== expected) {
          ok = false;
          break;
        }
      }
    }
    expect(ok, 'some cell has the wrong value after the update').toBe(true);
  });
});

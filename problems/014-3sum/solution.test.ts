import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { threeSum } from './solution';

/** Sort each triplet and the list of triplets so answers can be compared regardless of order. */
function normalize(triplets: number[][]): number[][] {
  return triplets
    .map((t) => [...t].sort((a, b) => a - b))
    .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
}

/** Checks that every triplet sums to zero, uses only available values, and no two triplets match. */
function expectValidTriplets(nums: number[], result: number[][]): void {
  const available = new Map<number, number>();
  for (const n of nums) available.set(n, (available.get(n) ?? 0) + 1);
  const seen = new Set<string>();
  for (const t of result) {
    expect(t).toHaveLength(3);
    expect(t[0] + t[1] + t[2]).toBe(0);
    const used = new Map<number, number>();
    for (const v of t) used.set(v, (used.get(v) ?? 0) + 1);
    for (const [v, c] of used) expect(available.get(v) ?? 0).toBeGreaterThanOrEqual(c);
    const key = [...t].sort((a, b) => a - b).join(',');
    expect(seen.has(key), `duplicate triplet ${key}`).toBe(false);
    seen.add(key);
  }
}

describe('3Sum', () => {
  it('example 1: finds [-1,-1,2] and [-1,0,1]', () => {
    expect(normalize(threeSum([-1, 0, 1, 2, -1, -4]))).toEqual([
      [-1, -1, 2],
      [-1, 0, 1],
    ]);
  });

  it('example 2: no triplet sums to zero', () => {
    expect(threeSum([0, 1, 1])).toEqual([]);
  });

  it('example 3: three zeros give one triplet', () => {
    expect(normalize(threeSum([0, 0, 0]))).toEqual([[0, 0, 0]]);
  });

  it('many zeros still give only one [0,0,0]', () => {
    expect(normalize(threeSum([0, 0, 0, 0, 0, 0]))).toEqual([[0, 0, 0]]);
  });

  it('all positive numbers give no triplets', () => {
    expect(threeSum([1, 2, 3, 4, 5])).toEqual([]);
  });

  it('all negative numbers give no triplets', () => {
    expect(threeSum([-5, -4, -3, -2, -1])).toEqual([]);
  });

  it('does not reuse one element twice', () => {
    // 0 + 0 + 0 would need three zeros, and there are only two
    expect(threeSum([0, 0, 1])).toEqual([]);
    expect(normalize(threeSum([-2, 1, 1]))).toEqual([[-2, 1, 1]]);
    expect(threeSum([-2, 1])).toEqual([]);
  });

  it('duplicates of the same values produce each triplet once', () => {
    expect(normalize(threeSum([-2, -2, 0, 0, 2, 2]))).toEqual([[-2, 0, 2]]);
  });

  it('handles negatives and positives with several answers', () => {
    expect(normalize(threeSum([-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6]))).toEqual([
      [-4, -2, 6],
      [-4, 0, 4],
      [-4, 1, 3],
      [-4, 2, 2],
      [-2, -2, 4],
      [-2, 0, 2],
    ]);
  });

  it('handles the value limits', () => {
    expect(normalize(threeSum([-100000, 0, 100000, 100000, -100000]))).toEqual([[-100000, 0, 100000]]);
  });

  it('gives the same answer for sorted and reversed input', () => {
    const sorted = [-3, -1, 0, 1, 2, 4];
    const expected = normalize(threeSum([...sorted]));
    expect(normalize(threeSum([...sorted].reverse()))).toEqual(expected);
    expect(expected).toEqual([
      [-3, -1, 4],
      [-3, 1, 2],
      [-1, 0, 1],
    ]);
  });

  it('large input: 3000 zeros', () => {
    const nums = new Array<number>(3000).fill(0);
    const result = expectFast(() => threeSum(nums), 1000);
    expect(normalize(result)).toEqual([[0, 0, 0]]);
  });

  it('large input: 3000 random values give valid, unique triplets', () => {
    const rand = seededRandom(14);
    const nums = Array.from({ length: 3000 }, () => Math.floor(rand() * 2001) - 1000);
    const result = expectFast(() => threeSum(nums), 1500);
    expectValidTriplets(nums, result);
    // with 3000 values in [-1000, 1000] there are many distinct zero-sum triplets
    expect(result.length).toBeGreaterThan(10000);
  });

  it('large input: 3000 positive values give nothing', () => {
    const rand = seededRandom(7);
    const nums = Array.from({ length: 3000 }, () => 1 + Math.floor(rand() * 100000));
    const result = expectFast(() => threeSum(nums), 1000);
    expect(result).toEqual([]);
  });
});

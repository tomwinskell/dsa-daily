import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { topKFrequent } from './solution';

const sorted = (a: number[]): number[] => [...a].sort((x, y) => x - y);

describe('Top K Frequent Elements', () => {
  it('example 1: [1,1,1,2,2,3] with k = 2 gives 1 and 2', () => {
    expect(sorted(topKFrequent([1, 1, 1, 2, 2, 3], 2))).toEqual([1, 2]);
  });

  it('example 2: a single element', () => {
    expect(topKFrequent([1], 1)).toEqual([1]);
  });

  it('example 3: k = 1 picks the single most frequent value', () => {
    expect(topKFrequent([4, 4, 5, 5, 5, -2], 1)).toEqual([5]);
  });

  it('works with negative numbers and zero', () => {
    expect(sorted(topKFrequent([-1, -1, 0, 0, 0, -5, 7], 2))).toEqual([-1, 0]);
  });

  it('k equal to the number of distinct values returns every value', () => {
    expect(sorted(topKFrequent([3, 1, 2, 2, 3, 3], 3))).toEqual([1, 2, 3]);
  });

  it('the most frequent values are neither the first nor the largest seen', () => {
    expect(sorted(topKFrequent([9, 1, 2, 2, 2, 5, 5, 5, 2], 2))).toEqual([2, 5]);
  });

  it('values at the extremes of the allowed range', () => {
    expect(sorted(topKFrequent([10000, -10000, 10000, -10000, 10000, 0], 2))).toEqual([-10000, 10000]);
  });

  it('returns exactly k values with no repeats', () => {
    const result = topKFrequent([1, 1, 1, 2, 2, 3, 3, 3, 3, 4], 3);
    expect(result).toHaveLength(3);
    expect(new Set(result).size).toBe(3);
    expect(sorted(result)).toEqual([1, 2, 3]);
  });

  it('large input: 100000 numbers with a known top 5', () => {
    const rand = seededRandom(7);
    const heavy = [-9000, -3, 0, 42, 9999];
    const nums: number[] = [];
    // Heavy values appear 9000, 8000, 7000, 6000, 5000 times; everything else is random noise.
    heavy.forEach((v, i) => {
      for (let c = 0; c < 9000 - i * 1000; c++) nums.push(v);
    });
    while (nums.length < 100000) {
      const v = Math.floor(rand() * 20001) - 10000;
      if (!heavy.includes(v)) nums.push(v);
    }
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    const result = expectFast(() => topKFrequent(nums, 5), 500);
    expect(sorted(result)).toEqual(sorted(heavy));
  });
});

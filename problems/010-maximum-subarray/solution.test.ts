import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { maxSubArray } from './solution';

describe('Maximum Subarray', () => {
  it('example 1: [-2,1,-3,4,-1,2,1,-5,4] gives 6', () => {
    expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
  });

  it('example 2: a single element returns that element', () => {
    expect(maxSubArray([5])).toBe(5);
  });

  it('example 3: all negatives returns the largest single element', () => {
    expect(maxSubArray([-3, -1, -2])).toBe(-1);
  });

  it('a single negative element is returned as is', () => {
    expect(maxSubArray([-7])).toBe(-7);
  });

  it('all positives sums the whole array', () => {
    expect(maxSubArray([1, 2, 3, 4])).toBe(10);
  });

  it('all zeros gives 0', () => {
    expect(maxSubArray([0, 0, 0])).toBe(0);
  });

  it('a large negative in the middle splits the array', () => {
    expect(maxSubArray([3, 4, -100, 5, 6])).toBe(11);
    expect(maxSubArray([5, 6, -100, 3, 4])).toBe(11);
  });

  it('a small negative in the middle is worth bridging', () => {
    expect(maxSubArray([5, -1, 5])).toBe(9);
  });

  it('the best stretch can sit at the start or at the end', () => {
    expect(maxSubArray([8, -5, -5, 1])).toBe(8);
    expect(maxSubArray([1, -5, -5, 8])).toBe(8);
  });

  it('a zero between negatives beats any negative', () => {
    expect(maxSubArray([-2, 0, -3])).toBe(0);
  });

  it('large input: 100000 ones gives n', () => {
    const n = 100000;
    const nums = new Array<number>(n).fill(1);
    expect(expectFast(() => maxSubArray(nums), 300)).toBe(n);
  });

  it('large input: negatives, then a positive block, then negatives', () => {
    const n = 100000;
    const nums = new Array<number>(n).fill(-1);
    for (let i = 30000; i < 70000; i++) nums[i] = 2;
    expect(expectFast(() => maxSubArray(nums), 300)).toBe(80000);
  });

  it('large input: random small positives hidden between huge negatives', () => {
    const rand = seededRandom(10);
    const n = 100000;
    const nums = new Array<number>(n).fill(-10000);
    let expected = 0;
    for (let i = 40000; i < 60000; i++) {
      const v = 1 + Math.floor(rand() * 10);
      nums[i] = v;
      expected += v;
    }
    expect(expectFast(() => maxSubArray(nums), 300)).toBe(expected);
  });

  it('large input: all negatives returns the single largest element', () => {
    const rand = seededRandom(11);
    const n = 100000;
    const nums: number[] = [];
    let best = -Infinity;
    for (let i = 0; i < n; i++) {
      const v = -1 - Math.floor(rand() * 10000);
      nums.push(v);
      if (v > best) best = v;
    }
    expect(expectFast(() => maxSubArray(nums), 300)).toBe(best);
  });
});

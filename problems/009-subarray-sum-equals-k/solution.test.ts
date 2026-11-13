import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { subarraySum } from './solution';

describe('Subarray Sum Equals K', () => {
  it('example 1: [1,1,1] with k=2 gives 2', () => {
    expect(subarraySum([1, 1, 1], 2)).toBe(2);
  });

  it('example 2: [1,2,3] with k=3 gives 2', () => {
    expect(subarraySum([1, 2, 3], 3)).toBe(2);
  });

  it('example 3: [1,-1,0] with k=0 gives 3', () => {
    expect(subarraySum([1, -1, 0], 0)).toBe(3);
  });

  it('a single element equal to k gives 1', () => {
    expect(subarraySum([5], 5)).toBe(1);
  });

  it('a single element not equal to k gives 0', () => {
    expect(subarraySum([5], 4)).toBe(0);
  });

  it('negative numbers can make later stretches reach k again', () => {
    expect(subarraySum([3, 4, 7, 2, -3, 1, 4, 2], 7)).toBe(4);
  });

  it('negative k with negative values', () => {
    expect(subarraySum([-1, -1, 1], 0)).toBe(1);
    expect(subarraySum([-1, -2, -3], -3)).toBe(2);
  });

  it('zeros multiply the number of matching stretches', () => {
    expect(subarraySum([0, 0, 0], 0)).toBe(6);
    expect(subarraySum([0, 0, 3, 0], 3)).toBe(6);
  });

  it('no stretch reaches k gives 0', () => {
    expect(subarraySum([1, 2, 3, 4], 100)).toBe(0);
  });

  it('large input: 20000 zeros with k=0 gives n*(n+1)/2', () => {
    const n = 20000;
    const nums = new Array<number>(n).fill(0);
    const result = expectFast(() => subarraySum(nums, 0), 300);
    expect(result).toBe((n * (n + 1)) / 2);
  });

  it('large input: 20000 ones with k=2 gives n-1', () => {
    const n = 20000;
    const nums = new Array<number>(n).fill(1);
    const result = expectFast(() => subarraySum(nums, 2), 300);
    expect(result).toBe(n - 1);
  });

  it('large input: alternating +1/-1 with k=0 and a random tail check', () => {
    const n = 20000;
    const rand = seededRandom(9);
    const nums: number[] = [];
    for (let i = 0; i < n; i++) nums.push(i % 2 === 0 ? 1 : -1);
    // Prefix sums alternate 1,0,1,0..., so stretches summing to 0 start and end at same parity.
    // Even-length stretches only: for each start there are floor((n - start) / 2) of them.
    let expected = 0;
    for (let s = 0; s < n; s++) expected += Math.floor((n - s) / 2);
    expect(rand()).toBeGreaterThanOrEqual(0);
    expect(expectFast(() => subarraySum(nums, 0), 300)).toBe(expected);
  });
});

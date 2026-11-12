import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { longestConsecutive } from './solution';

describe('Longest Consecutive Sequence', () => {
  it('example 1: [100,4,200,1,3,2] gives 4', () => {
    expect(longestConsecutive([100, 4, 200, 1, 3, 2])).toBe(4);
  });

  it('example 2: a run of nine hidden among duplicates', () => {
    expect(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])).toBe(9);
  });

  it('example 3: an empty array gives 0', () => {
    expect(longestConsecutive([])).toBe(0);
  });

  it('a single element gives 1', () => {
    expect(longestConsecutive([42])).toBe(1);
  });

  it('duplicates are only counted once', () => {
    expect(longestConsecutive([1, 1, 1, 1])).toBe(1);
    expect(longestConsecutive([1, 2, 2, 3, 3, 3])).toBe(3);
  });

  it('runs that cross zero with negative numbers', () => {
    expect(longestConsecutive([-2, 1, -1, 0, 5, -3])).toBe(5);
  });

  it('no two values are adjacent', () => {
    expect(longestConsecutive([10, 20, 30, 40])).toBe(1);
  });

  it('a descending array is one long run', () => {
    expect(longestConsecutive([5, 4, 3, 2, 1])).toBe(5);
  });

  it('picks the longest of several separate runs', () => {
    expect(longestConsecutive([1, 2, 3, 10, 11, 12, 13, 14, 50, 51])).toBe(5);
  });

  it('values at the extremes of the allowed range', () => {
    expect(longestConsecutive([1000000000, -1000000000, 999999999, 999999998])).toBe(3);
  });

  it('does not modify the input in a way that changes the answer when called twice', () => {
    const nums = [9, 1, 4, 7, 3, 2, 8, 5, 6];
    expect(longestConsecutive(nums)).toBe(9);
    expect(longestConsecutive(nums)).toBe(9);
  });

  it('large input: 100000 shuffled consecutive values', () => {
    const n = 100000;
    const rand = seededRandom(12345);
    const nums = Array.from({ length: n }, (_, i) => i - 50000);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    const result = expectFast(() => longestConsecutive(nums), 500);
    expect(result).toBe(n);
  });

  it('large input: 100000 values in spaced-out runs with a known longest run', () => {
    // Runs of length 1..~446 separated by gaps, so the longest run is known.
    const nums: number[] = [];
    let start = -1000000;
    let longest = 0;
    let len = 1;
    while (nums.length + len <= 100000) {
      for (let i = 0; i < len; i++) nums.push(start + i);
      longest = len;
      start += len + 5;
      len++;
    }
    const rand = seededRandom(777);
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    expect(expectFast(() => longestConsecutive(nums), 500)).toBe(longest);
  });
});

import { describe, expect, it } from 'vitest';
import { expectFast } from '../../lib/testing';
import { containsDuplicate } from './solution';

describe('Contains Duplicate', () => {
  it('example 1: [1, 2, 3, 1] -> true', () => {
    expect(containsDuplicate([1, 2, 3, 1])).toBe(true);
  });

  it('example 2: [1, 2, 3, 4] -> false', () => {
    expect(containsDuplicate([1, 2, 3, 4])).toBe(false);
  });

  it('example 3: many repeats -> true', () => {
    expect(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])).toBe(true);
  });

  it('a single element has no duplicate', () => {
    expect(containsDuplicate([42])).toBe(false);
  });

  it('two equal elements', () => {
    expect(containsDuplicate([7, 7])).toBe(true);
  });

  it('duplicates are far apart', () => {
    expect(containsDuplicate([9, 1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(true);
  });

  it('handles negatives and zero', () => {
    expect(containsDuplicate([0, -1, 5, -1])).toBe(true);
    expect(containsDuplicate([0, -1, 1, -2, 2])).toBe(false);
  });

  it('values near the limits that are all different', () => {
    expect(containsDuplicate([1_000_000_000, -1_000_000_000, 999_999_999, -999_999_999])).toBe(false);
  });

  it('large input with all distinct values (rules out comparing every pair)', () => {
    // 7919 and 1_000_003 are coprime, so these values never repeat for i < 500_000.
    const nums = Array.from({ length: 500_000 }, (_, i) => (i * 7919) % 1_000_003);
    expect(expectFast(() => containsDuplicate(nums), 1000)).toBe(false);
  });

  it('large input where the only repeat is first value == last value', () => {
    const nums = Array.from({ length: 500_000 }, (_, i) => (i * 7919) % 1_000_003);
    nums[nums.length - 1] = nums[0];
    expect(expectFast(() => containsDuplicate(nums), 1000)).toBe(true);
  });
});

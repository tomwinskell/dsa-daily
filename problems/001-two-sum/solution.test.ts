import { describe, expect, it } from 'vitest';
import { expectFast } from '../../lib/testing';
import { twoSum } from './solution';

/** Any valid pair is accepted, in either order. */
function check(nums: number[], target: number) {
  const result = twoSum([...nums], target);
  expect(result, 'should return exactly two indices').toHaveLength(2);
  const [i, j] = result;
  expect(
    Number.isInteger(i) && Number.isInteger(j),
    'indices must be integers',
  ).toBe(true);
  expect(i, 'must use two different elements').not.toBe(j);
  expect(
    i >= 0 && i < nums.length && j >= 0 && j < nums.length,
    'index out of range',
  ).toBe(true);
  expect(
    nums[i] + nums[j],
    `nums[${i}] + nums[${j}] should equal ${target}`,
  ).toBe(target);
}

describe('Two Sum', () => {
  it('example 1: [2, 7, 11, 15], target 9', () => check([2, 7, 11, 15], 9));
  it('example 2: [3, 2, 4], target 6 (cannot reuse the 3)', () =>
    check([3, 2, 4], 6));
  it('example 3: [3, 3], target 6 (duplicate values)', () => check([3, 3], 6));

  it('handles negative numbers', () => check([-1, -2, -3, -4, -5], -8));
  it('handles zero and a negative/positive mix', () => check([0, 4, 3, 0], 0));
  it('handles a pair that cancels out', () => check([5, 75, -5, 20], 0));
  it('pair is at the very end', () =>
    check([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 40, 50], 90));
  it('pair is at the very start', () => check([40, 50, 1, 2, 3, 4], 90));

  it('works with values near the constraint limits', () =>
    check(
      [1_000_000_000, 5, -1_000_000_000, 1_000_000_000 - 7],
      1_000_000_000 - 2,
    ));

  it('indices refer to the ORIGINAL array order', () => {
    // If you sort a copy, remember to map back to the original positions.
    check([8, 1, 7, 2, 6, 3, 5, 4], 15);
  });

  it('large input finishes quickly (rules out checking every pair)', () => {
    const n = 100_000;
    const nums: number[] = [];
    for (let i = 0; i < n - 2; i++) nums.push(2 * i); // evens: any two sum to an even number < 800_000
    nums.push(1_000_001, 1_000_003); // the only pair that reaches 2_000_004
    const result = expectFast(() => twoSum(nums, 2_000_004), 1000);
    expect([...result].sort((a, b) => a - b)).toEqual([n - 2, n - 1]);
  });
});

import { describe, expect, it } from 'vitest';
import { expectFast } from '../../lib/testing';
import { productExceptSelf } from './solution';

// Normalise -0 to 0 so results compare cleanly with toEqual.
const norm = (a: number[]): number[] => a.map((x) => x + 0);

describe('Product of Array Except Self', () => {
  it('example 1: [1,2,3,4] -> [24,12,8,6]', () => {
    expect(norm(productExceptSelf([1, 2, 3, 4]))).toEqual([24, 12, 8, 6]);
  });

  it('example 2: a single zero leaves only its own position non-zero', () => {
    expect(norm(productExceptSelf([-1, 1, 0, -3, 3]))).toEqual([0, 0, 9, 0, 0]);
  });

  it('two elements swap roles', () => {
    expect(norm(productExceptSelf([5, 2]))).toEqual([2, 5]);
  });

  it('two zeros make every product zero', () => {
    expect(norm(productExceptSelf([0, 4, 0, 2]))).toEqual([0, 0, 0, 0]);
  });

  it('handles all negative numbers', () => {
    expect(norm(productExceptSelf([-1, -2, -3]))).toEqual([6, 3, 2]);
  });

  it('handles all ones', () => {
    expect(norm(productExceptSelf([1, 1, 1, 1, 1]))).toEqual([1, 1, 1, 1, 1]);
  });

  it('handles a zero at the start and at the end', () => {
    expect(norm(productExceptSelf([0, 2, 3]))).toEqual([6, 0, 0]);
    expect(norm(productExceptSelf([2, 3, 0]))).toEqual([0, 0, 6]);
  });

  it('does not mutate the input array', () => {
    const input = [2, 3, 4];
    productExceptSelf(input);
    expect(input).toEqual([2, 3, 4]);
  });

  it('returns a new array with the same length', () => {
    const input = [7, 8, 9, 10];
    const out = productExceptSelf(input);
    expect(out).not.toBe(input);
    expect(out).toHaveLength(4);
  });

  it('large input: 100000 elements in well under a second', () => {
    const n = 100000;
    const nums = new Array<number>(n).fill(1);
    nums[0] = 2;
    nums[n - 1] = -3;
    const out = expectFast(() => productExceptSelf(nums), 200);
    expect(out).toHaveLength(n);
    expect(out[0] + 0).toBe(-3);
    expect(out[n - 1] + 0).toBe(2);
    expect(out[n >> 1] + 0).toBe(-6);
    expect(out.every((v, i) => i === 0 || i === n - 1 || v === -6)).toBe(true);
  });

  it('large input with a single zero: only the zero position is non-zero', () => {
    const n = 100000;
    const nums = new Array<number>(n).fill(1);
    nums[n >> 1] = 0;
    nums[3] = -2;
    const out = expectFast(() => productExceptSelf(nums), 200);
    expect(out[n >> 1] + 0).toBe(-2);
    expect(out[0] + 0).toBe(0);
    expect(out[n - 1] + 0).toBe(0);
  });
});

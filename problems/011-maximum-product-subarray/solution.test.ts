import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { maxProduct } from './solution';

describe('Maximum Product Subarray', () => {
  it('example 1: [2,3,-2,4] gives 6', () => {
    expect(maxProduct([2, 3, -2, 4])).toBe(6);
  });

  it('example 2: a zero splits two negatives, so [-2,0,-1] gives 0', () => {
    expect(maxProduct([-2, 0, -1])).toBe(0);
  });

  it('example 3: two negatives cancel, so [-2,3,-4] gives 24', () => {
    expect(maxProduct([-2, 3, -4])).toBe(24);
  });

  it('a single positive element is returned as is', () => {
    expect(maxProduct([5])).toBe(5);
  });

  it('a single negative element is returned as is', () => {
    expect(maxProduct([-3])).toBe(-3);
  });

  it('all zeros gives 0', () => {
    expect(maxProduct([0, 0, 0])).toBe(0);
  });

  it('a lone negative among zeros gives 0, not the negative', () => {
    expect(maxProduct([0, -4, 0])).toBe(0);
  });

  it('all negatives with an odd count: drop one end to get a positive product', () => {
    expect(maxProduct([-1, -2, -3])).toBe(6);
    expect(maxProduct([-3, -2, -1, -4, -5])).toBe(40);
  });

  it('an odd number of negatives: the best stretch leaves out a negative at one end', () => {
    expect(maxProduct([-1, 5, 5, -2, 3, -1, 2])).toBe(300);
    expect(maxProduct([2, -5, 3, 4])).toBe(12);
  });

  it('a single negative with a single positive gives the positive', () => {
    expect(maxProduct([-2, 1])).toBe(1);
    expect(maxProduct([-2])).toBe(-2);
  });

  it('a zero in the middle resets the running product', () => {
    expect(maxProduct([3, -1, 4, 0, 2, 2, 2])).toBe(8);
  });

  it('ones and negative ones: an even count of negatives joins the whole stretch', () => {
    expect(maxProduct([-1, 1, -1, 1])).toBe(1);
    expect(maxProduct([-1, -1])).toBe(1);
  });

  it('large input of 100000 elements finishes quickly', () => {
    const rand = seededRandom(152);
    const n = 100000;
    const nums: number[] = [];
    let negatives = 0;
    for (let i = 0; i < n - 1; i++) {
      const v = rand() < 0.5 ? -1 : 1;
      if (v === -1) negatives++;
      nums.push(v);
    }
    // Make the negative count even so the whole array multiplies to +1, then end with a 2.
    if (negatives % 2 === 1) nums[0] = nums[0] === -1 ? 1 : -1;
    nums.push(2);
    expect(expectFast(() => maxProduct(nums), 500)).toBe(2);
  });

  it('large input split by zeros finishes quickly', () => {
    const n = 100000;
    const nums: number[] = new Array(n).fill(1);
    nums[n / 2] = 0;
    nums[n / 4] = -1;
    nums[n / 4 + 1] = -1;
    nums[n - 1] = 3;
    expect(expectFast(() => maxProduct(nums), 500)).toBe(3);
  });
});

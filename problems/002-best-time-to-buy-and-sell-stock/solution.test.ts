import { describe, expect, it } from 'vitest';
import { expectFast } from '../../lib/testing';
import { maxProfit } from './solution';

describe('Best Time to Buy and Sell Stock', () => {
  it('example 1: [7, 1, 5, 3, 6, 4] -> 5', () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
  });

  it('example 2: prices only fall -> 0', () => {
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
  });

  it('a single day cannot make a profit', () => {
    expect(maxProfit([5])).toBe(0);
  });

  it('two days, rising', () => {
    expect(maxProfit([1, 9])).toBe(8);
  });

  it('two days, falling', () => {
    expect(maxProfit([9, 1])).toBe(0);
  });

  it('flat prices -> 0', () => {
    expect(maxProfit([3, 3, 3, 3])).toBe(0);
  });

  it('the lowest price is NOT where the best trade starts', () => {
    // Global min is 1 on the last day, but nothing comes after it.
    expect(maxProfit([2, 10, 1])).toBe(8);
  });

  it('the highest price comes BEFORE the lowest (cannot sell before buying)', () => {
    expect(maxProfit([10, 1, 4])).toBe(3);
  });

  it('best trade is in the middle of the array', () => {
    expect(maxProfit([6, 3, 8, 2, 4, 1, 3])).toBe(5);
  });

  it('handles zeros', () => {
    expect(maxProfit([0, 0, 5, 0])).toBe(5);
  });

  it('does not modify the input', () => {
    const prices = [7, 1, 5, 3, 6, 4];
    maxProfit(prices);
    expect(prices).toEqual([7, 1, 5, 3, 6, 4]);
  });

  it('a million prices finishes quickly (rules out trying every buy/sell pair)', () => {
    const n = 1_000_000;
    const prices: number[] = new Array(n);
    // Fall from 1_000_000 to 500_001, then climb from 500_002 to 1_000_001.
    for (let i = 0; i < n / 2; i++) prices[i] = 1_000_000 - i;
    for (let i = n / 2; i < n; i++) prices[i] = 500_001 + (i - (n / 2 - 1));
    expect(expectFast(() => maxProfit(prices), 1000)).toBe(500_000);
  });
});

import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { maxArea } from './solution';

describe('Container With Most Water', () => {
  it('example 1: [1,8,6,2,5,4,8,3,7] -> 49', () => {
    expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
  });

  it('example 2: two walls of height 1 -> 1', () => {
    expect(maxArea([1, 1])).toBe(1);
  });

  it('example 3: tall walls at both ends -> 16', () => {
    expect(maxArea([4, 3, 2, 1, 4])).toBe(16);
  });

  it('two walls where one is zero holds nothing', () => {
    expect(maxArea([0, 5])).toBe(0);
  });

  it('all zeros holds nothing', () => {
    expect(maxArea([0, 0, 0, 0])).toBe(0);
  });

  it('strictly increasing heights: [1,2,3,4,5] -> 6', () => {
    expect(maxArea([1, 2, 3, 4, 5])).toBe(6);
  });

  it('strictly decreasing heights: [5,4,3,2,1] -> 6', () => {
    expect(maxArea([5, 4, 3, 2, 1])).toBe(6);
  });

  it('the best pair is not the outermost pair', () => {
    expect(maxArea([1, 10, 10, 1, 1, 1, 1, 2])).toBe(12);
  });

  it('the best pair can sit in the middle: [2,3,4,5,18,17,6] -> 17', () => {
    expect(maxArea([2, 3, 4, 5, 18, 17, 6])).toBe(17);
  });

  it('walls in between never matter, even when taller', () => {
    expect(maxArea([3, 100, 100, 100, 3])).toBe(200);
  });

  it('large input: 100000 equal walls of height 1 -> 99999', () => {
    const h = new Array(100000).fill(1);
    expect(expectFast(() => maxArea(h), 1000)).toBe(99999);
  });

  it('large input: tall walls at both ends of 100000 small walls', () => {
    const rand = seededRandom(15);
    const h = Array.from({ length: 100000 }, () => Math.floor(rand() * 5000));
    h[0] = 10000;
    h[h.length - 1] = 10000;
    expect(expectFast(() => maxArea(h), 1000)).toBe(10000 * 99999);
  });
});

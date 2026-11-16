import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { trap } from './solution';

describe('Trapping Rain Water', () => {
  it('example 1: [0,1,0,2,1,0,1,3,2,1,2,1] traps 6', () => {
    expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
  });

  it('example 2: [4,2,0,3,2,5] traps 9', () => {
    expect(trap([4, 2, 0, 3, 2, 5])).toBe(9);
  });

  it('example 3: a single dip [3,0,3] traps 3', () => {
    expect(trap([3, 0, 3])).toBe(3);
  });

  it('a single bar traps nothing', () => {
    expect(trap([7])).toBe(0);
  });

  it('two bars trap nothing', () => {
    expect(trap([3, 5])).toBe(0);
  });

  it('all zeros trap nothing', () => {
    expect(trap([0, 0, 0, 0])).toBe(0);
  });

  it('a flat surface traps nothing', () => {
    expect(trap([4, 4, 4, 4, 4])).toBe(0);
  });

  it('strictly increasing bars trap nothing', () => {
    expect(trap([1, 2, 3, 4, 5])).toBe(0);
  });

  it('strictly decreasing bars trap nothing', () => {
    expect(trap([5, 4, 3, 2, 1])).toBe(0);
  });

  it('a peak in the middle traps nothing', () => {
    expect(trap([1, 3, 5, 3, 1])).toBe(0);
  });

  it('water cannot rest against a tall bar alone: a lone tall bar holds nothing, and the lower right wall sets the level', () => {
    expect(trap([0, 0, 5, 0, 0])).toBe(0);
    expect(trap([5, 0, 0, 1, 2])).toBe(5);
  });

  it('the water level is set by the shorter wall: [5,1,2] traps 1', () => {
    expect(trap([5, 1, 2])).toBe(1);
    expect(trap([2, 1, 5])).toBe(1);
  });

  it('a wide basin with an uneven floor', () => {
    expect(trap([5, 2, 1, 2, 1, 5])).toBe(14);
  });

  it('nested basins: an inner dip sits inside a bigger one', () => {
    expect(trap([5, 0, 3, 0, 5])).toBe(12);
  });

  it('large valley: two tall walls with a flat floor of 99998 bars', () => {
    const n = 100000;
    const h = 100000;
    const heights: number[] = new Array(n).fill(0);
    heights[0] = h;
    heights[n - 1] = h;
    expect(expectFast(() => trap(heights), 500)).toBe((n - 2) * h);
  });

  it('large repeating pattern: 5,0,0 repeated, each gap holds 10', () => {
    const gaps = 33333;
    const heights: number[] = [5];
    for (let i = 0; i < gaps; i++) heights.push(0, 0, 5);
    expect(expectFast(() => trap(heights), 500)).toBe(gaps * 10);
  });

  it('large input with a random floor under two tall walls', () => {
    const rand = seededRandom(212);
    const n = 100000;
    const heights: number[] = [100000];
    let floorTotal = 0;
    for (let i = 1; i < n - 1; i++) {
      const v = Math.floor(rand() * 1000);
      heights.push(v);
      floorTotal += v;
    }
    heights.push(100000);
    expect(expectFast(() => trap(heights), 500)).toBe((n - 2) * 100000 - floorTotal);
  });
});

import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { eraseOverlapIntervals } from './solution';

describe('Non-overlapping Intervals', () => {
  it('example 1: one interval spans two others', () => {
    expect(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])).toBe(1);
  });
  it('example 2: identical intervals', () => {
    expect(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])).toBe(2);
  });
  it('example 3: touching intervals do not overlap', () => {
    expect(eraseOverlapIntervals([[1, 2], [2, 3]])).toBe(0);
  });
  it('single interval', () => {
    expect(eraseOverlapIntervals([[0, 1]])).toBe(0);
  });
  it('unsorted input with no overlaps', () => {
    expect(eraseOverlapIntervals([[5, 6], [1, 2], [3, 4]])).toBe(0);
  });
  it('one long interval overlaps many short ones', () => {
    expect(eraseOverlapIntervals([[0, 100], [1, 2], [3, 4], [5, 6], [7, 8]])).toBe(1);
  });
  it('negative coordinates', () => {
    expect(eraseOverlapIntervals([[-10, -5], [-7, -2], [-3, 0], [-1, 4]])).toBe(2);
  });
  it('nested intervals chain', () => {
    expect(eraseOverlapIntervals([[1, 10], [2, 9], [3, 8], [4, 7]])).toBe(3);
  });
  it('keeping the earliest-ending intervals beats keeping the earliest-starting', () => {
    expect(eraseOverlapIntervals([[1, 11], [2, 3], [4, 5], [6, 7], [8, 9], [10, 12]])).toBe(1);
  });
  it('does not mutate the input array', () => {
    const input = [[3, 4], [1, 3], [1, 2]];
    eraseOverlapIntervals(input);
    expect(input).toEqual([[3, 4], [1, 3], [1, 2]]);
  });
  it('large input: 100,000 intervals in shuffled order', () => {
    // 10,000 slots of width 10 that only touch each other. Each slot holds 10 mutually overlapping
    // intervals, so exactly one per slot can stay: 90,000 removals.
    const rand = seededRandom(22);
    const slots = 10000;
    const intervals: number[][] = [];
    for (let s = 0; s < slots; s++) {
      const base = s * 5 - 50000;
      intervals.push([base, base + 5]);
      for (let k = 1; k < 10; k++) {
        const a = base + Math.floor(rand() * 2);
        const b = base + 4 + Math.floor(rand() * 2);
        intervals.push([a, Math.max(b, a + 1)]);
      }
    }
    for (let i = intervals.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [intervals[i], intervals[j]] = [intervals[j], intervals[i]];
    }
    expect(expectFast(() => eraseOverlapIntervals(intervals), 1000)).toBe(90000);
  });
});

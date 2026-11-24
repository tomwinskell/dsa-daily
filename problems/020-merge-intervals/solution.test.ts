import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { merge } from './solution';

describe('Merge Intervals', () => {
  it('example 1: overlapping intervals are combined', () => {
    expect(merge([[1, 3], [2, 6], [8, 10], [15, 18]])).toEqual([[1, 6], [8, 10], [15, 18]]);
  });

  it('example 2: intervals touching at an endpoint are merged', () => {
    expect(merge([[1, 4], [4, 5]])).toEqual([[1, 5]]);
  });

  it('example 3: unsorted, non-overlapping input comes back sorted', () => {
    expect(merge([[5, 6], [1, 2], [3, 4]])).toEqual([[1, 2], [3, 4], [5, 6]]);
  });

  it('a single interval is returned unchanged', () => {
    expect(merge([[3, 7]])).toEqual([[3, 7]]);
  });

  it('a single point interval stays a point', () => {
    expect(merge([[4, 4]])).toEqual([[4, 4]]);
  });

  it('an interval fully inside another is absorbed', () => {
    expect(merge([[1, 10], [2, 3], [4, 5]])).toEqual([[1, 10]]);
  });

  it('a chain of overlaps collapses into one interval, even when given out of order', () => {
    expect(merge([[5, 8], [1, 3], [3, 5], [7, 9]])).toEqual([[1, 9]]);
  });

  it('identical intervals collapse to one', () => {
    expect(merge([[2, 5], [2, 5], [2, 5]])).toEqual([[2, 5]]);
  });

  it('intervals one apart are not merged', () => {
    expect(merge([[1, 2], [3, 4]])).toEqual([[1, 2], [3, 4]]);
  });

  it('merges two unsorted overlapping intervals', () => {
    expect(merge([[2, 4], [1, 3]])).toEqual([[1, 4]]);
  });

  it('large input: 100000 shuffled intervals that collapse into 5000 known groups', () => {
    const rand = seededRandom(20);
    const groups = 5000;
    const perGroup = 20;
    const stride = 250;
    const input: number[][] = [];
    for (let g = 0; g < groups; g++) {
      const base = g * stride;
      // 20 chained, overlapping pieces covering [base, base + 200 .. 204]
      for (let k = 0; k < perGroup; k++) {
        const start = base + k * 10;
        input.push([start, start + 10 + Math.floor(rand() * 5)]);
      }
    }
    for (let i = input.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [input[i], input[j]] = [input[j], input[i]];
    }
    const result = expectFast(() => merge(input), 1000);
    expect(result.length).toBe(groups);
    for (let g = 0; g < groups; g++) {
      expect(result[g][0]).toBe(g * stride);
      expect(result[g][1]).toBeGreaterThanOrEqual(g * stride + 200);
      expect(result[g][1]).toBeLessThanOrEqual(g * stride + 204);
    }
  });
});

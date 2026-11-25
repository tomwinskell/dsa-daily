import { describe, expect, it } from 'vitest';
import { expectFast } from '../../lib/testing';
import { insert } from './solution';

describe('Insert Interval', () => {
  it('example 1: new interval overlaps the first interval', () => {
    expect(insert([[1, 3], [6, 9]], [2, 5])).toEqual([[1, 5], [6, 9]]);
  });
  it('example 2: new interval swallows several intervals', () => {
    expect(insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8])).toEqual([[1, 2], [3, 10], [12, 16]]);
  });
  it('example 3: empty list', () => {
    expect(insert([], [5, 7])).toEqual([[5, 7]]);
  });
  it('new interval goes before everything without overlap', () => {
    expect(insert([[5, 6], [8, 9]], [1, 2])).toEqual([[1, 2], [5, 6], [8, 9]]);
  });
  it('new interval goes after everything without overlap', () => {
    expect(insert([[1, 2], [4, 5]], [7, 8])).toEqual([[1, 2], [4, 5], [7, 8]]);
  });
  it('new interval fits in a gap between intervals', () => {
    expect(insert([[1, 2], [8, 9]], [4, 5])).toEqual([[1, 2], [4, 5], [8, 9]]);
  });
  it('touching endpoints merge on both sides', () => {
    expect(insert([[1, 2], [5, 6]], [2, 5])).toEqual([[1, 6]]);
  });
  it('new interval is contained inside an existing interval', () => {
    expect(insert([[1, 10], [12, 14]], [3, 4])).toEqual([[1, 10], [12, 14]]);
  });
  it('new interval covers every existing interval', () => {
    expect(insert([[2, 3], [4, 5], [6, 7]], [0, 100])).toEqual([[0, 100]]);
  });
  it('zero-length new interval', () => {
    expect(insert([[1, 2], [4, 6]], [3, 3])).toEqual([[1, 2], [3, 3], [4, 6]]);
    expect(insert([[1, 2], [4, 6]], [5, 5])).toEqual([[1, 2], [4, 6]]);
  });
  it('does not mutate the input array', () => {
    const input = [[1, 3], [6, 9]];
    insert(input, [2, 5]);
    expect(input).toEqual([[1, 3], [6, 9]]);
  });
  it('large input: 100000 intervals, new interval bridging the middle 50000', () => {
    const n = 100000;
    const input: number[][] = [];
    for (let i = 0; i < n; i++) input.push([i * 10, i * 10 + 5]);
    const lo = 25000;
    const hi = 74999;
    const expected = [...input.slice(0, lo), [lo * 10, hi * 10 + 5], ...input.slice(hi + 1)];
    const result = expectFast(() => insert(input, [lo * 10 + 2, hi * 10 + 3]), 1000);
    expect(result.length).toBe(expected.length);
    expect(result).toEqual(expected);
  });
});

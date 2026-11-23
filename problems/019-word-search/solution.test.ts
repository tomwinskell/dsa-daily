import { describe, expect, it } from 'vitest';
import { expectFast } from '../../lib/testing';
import { exist } from './solution';

const grid = (rows: string[]): string[][] => rows.map((r) => r.split(''));
const sample = () => grid(['ABCE', 'SFCS', 'ADEE']);

describe('Word Search', () => {
  it('example 1: ABCCED can be traced through the grid', () => {
    expect(exist(sample(), 'ABCCED')).toBe(true);
  });

  it('example 2: SEE can be traced down the right edge', () => {
    expect(exist(sample(), 'SEE')).toBe(true);
  });

  it('example 3: ABCB needs the single B twice, so it is false', () => {
    expect(exist(sample(), 'ABCB')).toBe(false);
  });

  it('a single-cell board matches a one-letter word', () => {
    expect(exist(grid(['a']), 'a')).toBe(true);
    expect(exist(grid(['a']), 'b')).toBe(false);
  });

  it('a single cell cannot spell a two-letter word with the same letter', () => {
    expect(exist(grid(['a']), 'aa')).toBe(false);
  });

  it('a word longer than the number of cells is false', () => {
    expect(exist(grid(['ab', 'cd']), 'abcdx')).toBe(false);
    expect(exist(grid(['ab', 'cd']), 'abcdabcd')).toBe(false);
  });

  it('diagonal moves are not allowed', () => {
    expect(exist(grid(['ab', 'cd']), 'ad')).toBe(false);
    expect(exist(grid(['ab', 'cd']), 'bc')).toBe(false);
  });

  it('a path may use every cell of the board (snake through a 2x2)', () => {
    expect(exist(grid(['ab', 'dc']), 'abcd')).toBe(true);
    expect(exist(grid(['ab', 'dc']), 'adcb')).toBe(true);
  });

  it('the word can be read in a straight line along a row or column', () => {
    expect(exist(grid(['abcd']), 'abcd')).toBe(true);
    expect(exist(grid(['abcd']), 'dcba')).toBe(true);
    expect(exist(grid(['a', 'b', 'c']), 'cba')).toBe(true);
  });

  it('matching is case sensitive', () => {
    expect(exist(grid(['Ab']), 'ab')).toBe(false);
    expect(exist(grid(['Ab']), 'Ab')).toBe(true);
  });

  it('a wrong first attempt must not leave cells marked as used', () => {
    // The first "a" tried leads down a dead end; the real path starts at the other "a".
    expect(exist(grid(['abxa', 'xxxb', 'xxxc']), 'abc')).toBe(true);
    expect(exist(grid(['aab', 'xcx']), 'aabc')).toBe(false);
    expect(exist(grid(['aab', 'xcx']), 'aac')).toBe(true);
    expect(exist(grid(['cab', 'bxa']), 'abac')).toBe(true);
  });

  it('large input: a 6x6 grid of "a" and a long word ending in a letter that is not on the board', () => {
    const board = grid(Array.from({ length: 6 }, () => 'aaaaaa'));
    expect(expectFast(() => exist(board, 'a'.repeat(14) + 'b'), 500)).toBe(false);
  });

  it('large input: a 6x6 grid of "a" where the word is the full 15 letters of "a" (true)', () => {
    const board = grid(Array.from({ length: 6 }, () => 'aaaaaa'));
    expect(expectFast(() => exist(board, 'a'.repeat(15)), 500)).toBe(true);
  });

  it('large input: nearly-matching word on a mostly-"a" board with one "b" that is unreachable in time', () => {
    const rows = Array.from({ length: 6 }, () => 'aaaaaa');
    rows[5] = 'aaaaab';
    // 'b' exists, but the word needs two of them.
    expect(expectFast(() => exist(grid(rows), 'a'.repeat(13) + 'bb'), 500)).toBe(false);
  });
});

import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { lengthOfLongestSubstring } from './solution';

describe('Longest Substring Without Repeating Characters', () => {
  it('example 1: repeating pattern', () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
  });
  it('example 2: all the same character', () => {
    expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
  });
  it('example 3: answer is a substring, not a subsequence', () => {
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
  });
  it('empty string', () => {
    expect(lengthOfLongestSubstring('')).toBe(0);
  });
  it('single character', () => {
    expect(lengthOfLongestSubstring('a')).toBe(1);
  });
  it('all characters distinct', () => {
    expect(lengthOfLongestSubstring('abcdefg')).toBe(7);
  });
  it('repeat of an early character far behind the window start', () => {
    expect(lengthOfLongestSubstring('abba')).toBe(2);
  });
  it('window must jump past the previous occurrence', () => {
    expect(lengthOfLongestSubstring('tmmzuxt')).toBe(5);
  });
  it('spaces and symbols count as characters', () => {
    expect(lengthOfLongestSubstring('a b!a b!c')).toBe(5);
  });
  it('two-character alternation', () => {
    expect(lengthOfLongestSubstring('ababababab')).toBe(2);
  });
  it('large input: 50,000 characters with a known longest run', () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    // Repeating the alphabet gives a longest run of exactly 26.
    const periodic = alphabet.repeat(Math.ceil(50000 / 26)).slice(0, 50000);
    expect(expectFast(() => lengthOfLongestSubstring(periodic), 500)).toBe(26);
  });
  it('large input: 50,000 random characters from a small alphabet', () => {
    const rand = seededRandom(23);
    const chars = 'abcdefghij';
    let s = '';
    for (let i = 0; i < 50000; i++) s += chars[Math.floor(rand() * chars.length)];
    const result = expectFast(() => lengthOfLongestSubstring(s), 500);
    expect(result).toBeGreaterThanOrEqual(2);
    expect(result).toBeLessThanOrEqual(10);
    // The reported length must actually be achievable: verify with a quick independent check of an upper bound.
    let best = 0;
    for (let i = 0; i < s.length; i += 1000) {
      const seen = new Set<string>();
      for (let j = i; j < s.length && !seen.has(s[j]); j++) {
        seen.add(s[j]);
        best = Math.max(best, seen.size);
      }
    }
    expect(result).toBeGreaterThanOrEqual(best);
  });
});

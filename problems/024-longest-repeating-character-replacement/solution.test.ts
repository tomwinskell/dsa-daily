import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { characterReplacement } from './solution';

describe('Longest Repeating Character Replacement', () => {
  it('example 1: two replacements turn ABAB into one letter', () => {
    expect(characterReplacement('ABAB', 2)).toBe(4);
  });
  it('example 2: one replacement in AABABBA', () => {
    expect(characterReplacement('AABABBA', 1)).toBe(4);
  });
  it('example 3: no replacements allowed', () => {
    expect(characterReplacement('ABC', 0)).toBe(1);
  });
  it('single character', () => {
    expect(characterReplacement('A', 0)).toBe(1);
    expect(characterReplacement('Z', 1)).toBe(1);
  });
  it('already a single repeated letter', () => {
    expect(characterReplacement('AAAAA', 0)).toBe(5);
  });
  it('k equal to the length covers the whole string', () => {
    expect(characterReplacement('ABCDE', 5)).toBe(5);
  });
  it('k larger than needed still caps at string length', () => {
    expect(characterReplacement('AB', 2)).toBe(2);
  });
  it('k = 0 finds the longest existing run', () => {
    expect(characterReplacement('AABBBCCDDDDE', 0)).toBe(4);
  });
  it('best window is at the end of the string', () => {
    expect(characterReplacement('ABCDEAAAB', 1)).toBe(4);
  });
  it('best window uses a letter other than the first one', () => {
    expect(characterReplacement('ABBBAB', 1)).toBe(5);
  });
  it('alternating letters with one replacement', () => {
    expect(characterReplacement('ABABABABAB', 1)).toBe(3);
  });
  it('a stale majority letter does not inflate the answer', () => {
    expect(characterReplacement('AAABCDEFGH', 1)).toBe(4);
  });
  it('large input: 100,000 identical letters', () => {
    const s = 'A'.repeat(100000);
    expect(expectFast(() => characterReplacement(s, 0), 500)).toBe(100000);
  });
  it('large input: two long blocks with a known answer', () => {
    const s = 'A'.repeat(50000) + 'B'.repeat(50000);
    expect(expectFast(() => characterReplacement(s, 100), 500)).toBe(50100);
  });
  it('large input: 100,000 cycling letters with no replacements', () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const s = alphabet.repeat(Math.ceil(100000 / 26)).slice(0, 100000);
    expect(expectFast(() => characterReplacement(s, 0), 500)).toBe(1);
  });
  it('large input: random letters stay within sane bounds', () => {
    const rand = seededRandom(24);
    const chars: string[] = [];
    for (let i = 0; i < 100000; i++) chars.push(String.fromCharCode(65 + Math.floor(rand() * 4)));
    const s = chars.join('');
    const k = 50;
    const result = expectFast(() => characterReplacement(s, k), 500);
    expect(result).toBeGreaterThanOrEqual(k + 1);
    expect(result).toBeLessThanOrEqual(s.length);
  });
});

import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { isPalindrome } from './solution';

describe('Valid Palindrome', () => {
  it('example 1: "A man, a plan, a canal: Panama" is a palindrome', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
  });

  it('example 2: "race a car" is not a palindrome', () => {
    expect(isPalindrome('race a car')).toBe(false);
  });

  it('example 3: a single space is a palindrome', () => {
    expect(isPalindrome(' ')).toBe(true);
  });

  it('the empty string is a palindrome', () => {
    expect(isPalindrome('')).toBe(true);
  });

  it('a string of only punctuation is a palindrome', () => {
    expect(isPalindrome('.,!?;: -- ()')).toBe(true);
  });

  it('a single character is a palindrome', () => {
    expect(isPalindrome('a')).toBe(true);
  });

  it('letter case is ignored', () => {
    expect(isPalindrome('Madam')).toBe(true);
    expect(isPalindrome('aBbA')).toBe(true);
  });

  it('digits count as characters', () => {
    expect(isPalindrome('12321')).toBe(true);
    expect(isPalindrome('0P')).toBe(false);
  });

  it('digits and letters are compared, not just letters', () => {
    expect(isPalindrome('ab2a')).toBe(false);
    expect(isPalindrome('a2a')).toBe(true);
  });

  it('mismatch near the middle is detected', () => {
    expect(isPalindrome('abcdXdcbea')).toBe(false);
  });

  it('even-length palindrome with separators in odd places', () => {
    expect(isPalindrome('ab, ,  b!!a')).toBe(true);
  });

  it('symbols next to letters do not break matching', () => {
    expect(isPalindrome('.,a')).toBe(true);
    expect(isPalindrome('a.b,')).toBe(false);
  });

  it('large input: 200000-character palindrome with noise', () => {
    const rand = seededRandom(13);
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const half: string[] = [];
    for (let i = 0; i < 50000; i++) half.push(alphabet[Math.floor(rand() * alphabet.length)]);
    const mirrored = [...half].reverse().map((c) => (rand() < 0.5 ? c.toUpperCase() : c.toLowerCase()));
    const noise = ' ,.-!';
    const build = (chars: string[]) =>
      chars.map((c) => c + noise[Math.floor(rand() * noise.length)].repeat(Math.floor(rand() * 3))).join('');
    const s = build(half) + 'x' + build(mirrored);
    expect(s.length).toBeGreaterThan(100000);
    expect(expectFast(() => isPalindrome(s), 500)).toBe(true);
  });

  it('large input: a single differing character at the very centre', () => {
    const left = 'a'.repeat(99999);
    const s = left + 'b' + 'c' + left;
    expect(expectFast(() => isPalindrome(s), 500)).toBe(false);
  });
});

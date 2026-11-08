import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { isAnagram } from './solution';

function randomString(len: number, seed: number): string {
  const rand = seededRandom(seed);
  let out = '';
  for (let i = 0; i < len; i++) out += String.fromCharCode(97 + Math.floor(rand() * 26));
  return out;
}

function shuffle(str: string, seed: number): string {
  const rand = seededRandom(seed);
  const chars = str.split('');
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}

describe('Valid Anagram', () => {
  it('example 1: "anagram" and "nagaram" -> true', () => {
    expect(isAnagram('anagram', 'nagaram')).toBe(true);
  });

  it('example 2: "rat" and "car" -> false', () => {
    expect(isAnagram('rat', 'car')).toBe(false);
  });

  it('example 3: "listen" and "silent" -> true', () => {
    expect(isAnagram('listen', 'silent')).toBe(true);
  });

  it('single identical characters', () => {
    expect(isAnagram('a', 'a')).toBe(true);
  });

  it('single different characters', () => {
    expect(isAnagram('a', 'b')).toBe(false);
  });

  it('different lengths are never anagrams', () => {
    expect(isAnagram('ab', 'abc')).toBe(false);
    expect(isAnagram('abc', 'ab')).toBe(false);
  });

  it('same letters but different counts', () => {
    expect(isAnagram('aabb', 'abbb')).toBe(false);
    expect(isAnagram('aacc', 'ccac')).toBe(false);
  });

  it('identical strings are anagrams of each other', () => {
    expect(isAnagram('mississippi', 'mississippi')).toBe(true);
  });

  it('a reversed string is an anagram', () => {
    expect(isAnagram('abcdefghij', 'jihgfedcba')).toBe(true);
  });

  it('all 26 letters, shuffled', () => {
    expect(isAnagram('abcdefghijklmnopqrstuvwxyz', 'zyxwvutsrqponmlkjihgfedcba')).toBe(true);
  });

  it('large shuffled input -> true', () => {
    const s = randomString(500_000, 7);
    const t = shuffle(s, 11);
    expect(expectFast(() => isAnagram(s, t), 1000)).toBe(true);
  });

  it('large input differing by one character -> false', () => {
    const s = randomString(500_000, 7);
    const chars = shuffle(s, 11).split('');
    chars[250_000] = chars[250_000] === 'a' ? 'b' : 'a';
    const t = chars.join('');
    expect(expectFast(() => isAnagram(s, t), 1000)).toBe(false);
  });
});

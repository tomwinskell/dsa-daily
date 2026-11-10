import { describe, expect, it } from 'vitest';
import { expectFast, seededRandom } from '../../lib/testing';
import { groupAnagrams } from './solution';

// Sort strings inside each group, then sort the groups, so order never matters.
const canon = (groups: string[][]): string[][] =>
  groups.map((g) => [...g].sort()).sort((a, b) => a.join('|').localeCompare(b.join('|')));

const expectGroups = (actual: string[][], expected: string[][]): void => {
  expect(canon(actual)).toEqual(canon(expected));
};

describe('Group Anagrams', () => {
  it('example 1: eat/tea/ate, tan/nat, bat', () => {
    expectGroups(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']), [
      ['eat', 'tea', 'ate'],
      ['tan', 'nat'],
      ['bat'],
    ]);
  });

  it('example 2: a single empty string', () => {
    expectGroups(groupAnagrams(['']), [['']]);
  });

  it('example 3: a single one-letter string', () => {
    expectGroups(groupAnagrams(['a']), [['a']]);
  });

  it('several empty strings group together', () => {
    expectGroups(groupAnagrams(['', '', 'a', '']), [['', '', ''], ['a']]);
  });

  it('keeps duplicate strings, once per occurrence', () => {
    expectGroups(groupAnagrams(['abc', 'cab', 'abc', 'bca']), [['abc', 'cab', 'abc', 'bca']]);
  });

  it('no anagrams at all gives one group per string', () => {
    expectGroups(groupAnagrams(['abc', 'abd', 'abcd', 'ab']), [['abc'], ['abd'], ['abcd'], ['ab']]);
  });

  it('strings with the same letters but different counts are not anagrams', () => {
    expectGroups(groupAnagrams(['aab', 'abb', 'aba', 'baa']), [['aab', 'aba', 'baa'], ['abb']]);
  });

  it('strings of different lengths never group together', () => {
    expectGroups(groupAnagrams(['aa', 'a', 'aaa', 'aa']), [['aa', 'aa'], ['a'], ['aaa']]);
  });

  it('every string is returned exactly once across all groups', () => {
    const input = ['listen', 'silent', 'enlist', 'google', 'gogole', 'cat', 'act', 'tac', 'dog'];
    const result = groupAnagrams(input);
    expect(result.flat().sort()).toEqual([...input].sort());
    expect(result).toHaveLength(4);
  });

  it('large input: 10000 strings of length 100 in 500 known groups', () => {
    const rand = seededRandom(42);
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const shuffle = (s: string[]): string[] => {
      const a = [...s];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };
    const seen = new Set<string>();
    const expected: string[][] = [];
    const input: string[] = [];
    while (expected.length < 500) {
      const base = Array.from({ length: 100 }, () => letters[Math.floor(rand() * 26)]);
      const signature = [...base].sort().join('');
      if (seen.has(signature)) continue;
      seen.add(signature);
      const group: string[] = [];
      for (let i = 0; i < 20; i++) group.push(shuffle(base).join(''));
      expected.push(group);
      input.push(...group);
    }
    const result = expectFast(() => groupAnagrams(shuffle(input)), 1000);
    expectGroups(result, expected);
  });
});

# 4. Valid Anagram

**Easy** · Arrays & Hashing · [LeetCode](https://leetcode.com/problems/valid-anagram/)

Given two strings `s` and `t`, return `true` if `t` can be formed by rearranging all the characters of `s` (using every character exactly once), and `false` otherwise.

## Examples

| `s` | `t` | result |
| --- | --- | --- |
| `"anagram"` | `"nagaram"` | `true` |
| `"rat"` | `"car"` | `false` |
| `"listen"` | `"silent"` | `true` |

## Constraints

- `1 <= s.length, t.length <= 500_000`
- `s` and `t` consist of lowercase English letters

## Aim for

Linear time in the length of the strings. Sorting both strings works but is not the best you can do.

## How to run

Edit `solution.ts`, then `npm run submit -- 4` (or `npm run dev -- 4` to re-run on every save).

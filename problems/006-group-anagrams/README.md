# 6. Group Anagrams

**Medium** · Arrays & Hashing · [LeetCode](https://leetcode.com/problems/group-anagrams/)

You are given a list of lowercase strings `strs`. Two strings are anagrams if one can be rearranged into the other, using
every letter exactly once. Split `strs` into groups so that each group holds strings that are anagrams of each other, and
no two groups could be merged. Return the groups.

The groups may be returned in any order, and the strings inside each group may be in any order. Duplicate strings in the
input stay in the output, once per occurrence.

## Examples

| strs | groups | Why |
| --- | --- | --- |
| `["eat","tea","tan","ate","nat","bat"]` | `[["eat","tea","ate"],["tan","nat"],["bat"]]` | three distinct letter multisets |
| `[""]` | `[[""]]` | the empty string forms its own group |
| `["a"]` | `[["a"]]` | a single string is a single group |

## Constraints

- `1 <= strs.length <= 10000`
- `0 <= strs[i].length <= 100`
- `strs[i]` contains only lowercase English letters.

## Aim for

Roughly O(n * k) time, where n is the number of strings and k is the longest string length, or O(n * k log k) at worst.

## How to run

```
npm run submit -- 6
```

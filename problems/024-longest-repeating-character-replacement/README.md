# 24. Longest Repeating Character Replacement

**Medium** · Strings · [LeetCode](https://leetcode.com/problems/longest-repeating-character-replacement/)

You are given a string `s` of uppercase English letters and an integer `k`. In one operation you may pick any
position in `s` and change that character to any other uppercase letter. You can perform at most `k` operations.

After making your changes, look for the longest substring (a contiguous run) made up of a single repeated letter.
Return the greatest length you can achieve.

## Examples

| Input | Output | Why |
| --- | --- | --- |
| `s = "ABAB"`, `k = 2` | `4` | change both `A`s to `B` (or both `B`s to `A`) |
| `s = "AABABBA"`, `k = 1` | `4` | change the `B` at index 3 to get `"AAAA"` at the start |
| `s = "ABC"`, `k = 0` | `1` | no changes allowed, so the best run is a single letter |

## Constraints

- `1 <= s.length <= 10^5`
- `s` consists of uppercase English letters only
- `0 <= k <= s.length`

## Aim for

`O(n)` time.

## How to run

```
npm run submit -- 24
```

# 23. Longest Substring Without Repeating Characters

**Medium** · Strings · [LeetCode](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

Given a string `s`, find the length of the longest substring (a contiguous run of characters) in which no character
appears more than once. Return that length.

## Examples

| Input | Output | Why |
| --- | --- | --- |
| `"abcabcbb"` | `3` | `"abc"` is the longest repeat-free run |
| `"bbbbb"` | `1` | every run longer than one character repeats `b` |
| `"pwwkew"` | `3` | `"wke"` works; `"pwke"` is not contiguous |

## Constraints

- `0 <= s.length <= 5 * 10^4`
- `s` consists of English letters, digits, symbols and spaces

## Aim for

`O(n)` time.

## How to run

```
npm run submit -- 23
```

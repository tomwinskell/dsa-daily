# 13. Valid Palindrome

**Easy** · Two Pointers · [LeetCode](https://leetcode.com/problems/valid-palindrome/)

Given a string `s`, decide whether it reads the same forwards and backwards once you ignore everything that is not a
letter or a digit and treat uppercase and lowercase letters as the same. Return `true` if it does, `false` otherwise.
An empty string, or one that contains no letters or digits at all, counts as a palindrome.

## Examples

| s | result | Why |
| --- | --- | --- |
| `"A man, a plan, a canal: Panama"` | `true` | cleaned up it is `amanaplanacanalpanama` |
| `"race a car"` | `false` | cleaned up it is `raceacar` |
| `" "` | `true` | nothing is left after cleaning, and an empty string reads the same both ways |

## Constraints

- `0 <= s.length <= 200000`
- `s` contains printable ASCII characters only

## Aim for

O(n) time and O(1) extra space, where n is `s.length`.

## How to run

```
npm run submit -- 13
```

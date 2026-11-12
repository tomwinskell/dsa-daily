# 8. Longest Consecutive Sequence

**Medium** · Arrays & Hashing · [LeetCode](https://leetcode.com/problems/longest-consecutive-sequence/)

Given an unsorted array of integers `nums`, return the length of the longest run of values that follow one another
with no gaps, such as `5, 6, 7, 8`. The values do not need to appear next to each other, or in order, in the array.
Duplicates count once.

## Examples

| nums | result | Why |
| --- | --- | --- |
| `[100,4,200,1,3,2]` | `4` | `1, 2, 3, 4` is the longest run |
| `[0,3,7,2,5,8,4,6,0,1]` | `9` | `0` through `8` are all present |
| `[]` | `0` | there are no values |

## Constraints

- `0 <= nums.length <= 100000`
- `-1000000000 <= nums[i] <= 1000000000`

## Aim for

O(n) time, where n is `nums.length`.

## How to run

```
npm run submit -- 8
```

# 9. Subarray Sum Equals K

**Medium** · Arrays & Hashing · [LeetCode](https://leetcode.com/problems/subarray-sum-equals-k/)

Given an array of integers `nums` and an integer `k`, return how many contiguous, non-empty stretches of the array
add up to exactly `k`. Stretches are counted by position, so two stretches with the same values at different places
are counted separately. The array may contain negative numbers and zeros.

## Examples

| nums | k | result | Why |
| --- | --- | --- | --- |
| `[1,1,1]` | `2` | `2` | positions 0..1 and 1..2 |
| `[1,2,3]` | `3` | `2` | `[1,2]` and `[3]` |
| `[1,-1,0]` | `0` | `3` | `[1,-1]`, `[0]` and `[1,-1,0]` |

## Constraints

- `1 <= nums.length <= 20000`
- `-1000 <= nums[i] <= 1000`
- `-10000000 <= k <= 10000000`

## Aim for

O(n) time, where n is `nums.length`.

## How to run

```
npm run submit -- 9
```

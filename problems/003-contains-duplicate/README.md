# 3. Contains Duplicate

**Easy** · Arrays & Hashing · [LeetCode](https://leetcode.com/problems/contains-duplicate/)

Given an integer array `nums`, return `true` if any value shows up **at least twice**, and `false` if every element is distinct.

## Examples

| `nums` | result |
| --- | --- |
| `[1, 2, 3, 1]` | `true` |
| `[1, 2, 3, 4]` | `false` |
| `[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]` | `true` |

## Constraints

- `1 <= nums.length <= 500_000`
- `-1_000_000_000 <= nums[i] <= 1_000_000_000`

## Aim for

Faster than comparing every pair. There are two good approaches with different trade-offs (time vs. extra space), so try to name both once you've got one working.

## How to run

Edit `solution.ts`, then `npm run submit -- 3` (or `npm run dev -- 3` to re-run on every save).

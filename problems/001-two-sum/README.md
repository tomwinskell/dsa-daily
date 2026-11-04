# 1. Two Sum

**Easy** · Arrays & Hashing · [LeetCode](https://leetcode.com/problems/two-sum/)

You're given an array of integers `nums` and an integer `target`. Find the two elements whose sum is exactly `target` and return their **indices**.

Exactly one valid pair exists in every input, and you can't use the same element twice. The indices can come back in either order.

## Examples

| `nums` | `target` | result |
| --- | --- | --- |
| `[2, 7, 11, 15]` | `9` | `[0, 1]` |
| `[3, 2, 4]` | `6` | `[1, 2]` |
| `[3, 3]` | `6` | `[0, 1]` |

## Constraints

- `2 <= nums.length <= 100_000`
- `-1_000_000_000 <= nums[i], target <= 1_000_000_000`
- Exactly one valid answer exists.

## Aim for

Better than checking every pair. The largest test input is big enough that O(n²) will time out.

## How to run

Edit `solution.ts`, then `npm run submit -- 1` (or `npm run dev -- 1` to re-run on every save).

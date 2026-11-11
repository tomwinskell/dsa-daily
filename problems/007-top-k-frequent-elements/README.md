# 7. Top K Frequent Elements

**Medium** · Arrays & Hashing · [LeetCode](https://leetcode.com/problems/top-k-frequent-elements/)

You are given an array of integers `nums` and an integer `k`. Return the `k` values that occur most often in `nums`.

The answer can be returned in any order. The input is guaranteed to have a unique answer, so there is never a tie for
the last spot among the `k` values you return.

## Examples

| nums | k | result | Why |
| --- | --- | --- | --- |
| `[1,1,1,2,2,3]` | `2` | `[1,2]` | 1 appears three times, 2 appears twice, 3 once |
| `[1]` | `1` | `[1]` | only one value exists |
| `[4,4,5,5,5,-2]` | `1` | `[5]` | 5 appears most often |

## Constraints

- `1 <= nums.length <= 100000`
- `-10000 <= nums[i] <= 10000`
- `1 <= k <= the number of distinct values in nums`
- The set of `k` most frequent values is unique.

## Aim for

Better than O(n log n) time, where n is `nums.length`.

## How to run

```
npm run submit -- 7
```

# 14. 3Sum

**Medium** · Two Pointers · [LeetCode](https://leetcode.com/problems/3sum/)

Given an array of integers `nums`, find every group of three different positions whose values add up to zero.
Return the groups as value triplets. The result must not contain two triplets with the same values (order inside a
triplet and order of the triplets themselves do not matter).

## Examples

| `nums` | Result |
| --- | --- |
| `[-1, 0, 1, 2, -1, -4]` | `[[-1, -1, 2], [-1, 0, 1]]` |
| `[0, 1, 1]` | `[]` |
| `[0, 0, 0]` | `[[0, 0, 0]]` |

## Constraints

- `3 <= nums.length <= 3000`
- `-100000 <= nums[i] <= 100000`

## Aim for

Better than cubic time. Extra space beyond the output is up to you, but quadratic time is the target.

## How to run

```
npm run dev -- 14      # re-run the tests on every save
npm run submit -- 14   # submit
```

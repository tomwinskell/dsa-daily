# 10. Maximum Subarray

**Medium** · Arrays & Hashing · [LeetCode](https://leetcode.com/problems/maximum-subarray/)

Given an array of integers `nums`, look at every contiguous, non-empty stretch of the array and add up its values.
Return the largest total you can find. The array may contain negative numbers, zeros and positives, and the stretch
must contain at least one element, so an all-negative array still gives a negative answer.

## Examples

| nums | result | Why |
| --- | --- | --- |
| `[-2,1,-3,4,-1,2,1,-5,4]` | `6` | the stretch `[4,-1,2,1]` |
| `[5]` | `5` | only one stretch exists |
| `[-3,-1,-2]` | `-1` | the best stretch is the single element `-1` |

## Constraints

- `1 <= nums.length <= 100000`
- `-10000 <= nums[i] <= 10000`

## Aim for

O(n) time and O(1) extra space, where n is `nums.length`.

## How to run

```
npm run submit -- 10
```

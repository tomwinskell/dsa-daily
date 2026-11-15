# 11. Maximum Product Subarray

**Medium** · Arrays & Hashing · [LeetCode](https://leetcode.com/problems/maximum-product-subarray/)

Given an array of integers `nums`, consider every contiguous, non-empty stretch of the array and multiply its values
together. Return the largest product you can find. The array can hold negatives, zeros and positives, and a stretch
must contain at least one element, so a single-element array just gives back that element.

## Examples

| nums | result | Why |
| --- | --- | --- |
| `[2,3,-2,4]` | `6` | the stretch `[2,3]` |
| `[-2,0,-1]` | `0` | the zero is the best you can do; `-2` and `-1` can't be joined across it |
| `[-2,3,-4]` | `24` | the whole array: two negatives cancel out |

## Constraints

- `1 <= nums.length <= 100000`
- `-10 <= nums[i] <= 10`
- The product of any stretch of `nums` fits in a 32-bit signed integer.

## Aim for

O(n) time and O(1) extra space, where n is `nums.length`.

## How to run

```
npm run submit -- 11
```

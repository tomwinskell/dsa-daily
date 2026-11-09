# 5. Product of Array Except Self

**Medium** · Arrays & Hashing · [LeetCode](https://leetcode.com/problems/product-of-array-except-self/)

Given an array of integers `nums`, return an array `answer` of the same length where `answer[i]` is the product of every
element of `nums` except `nums[i]`.

You must not use division, and every prefix or suffix product is guaranteed to fit in a 32-bit signed integer.

## Examples

| nums | answer | Why |
| --- | --- | --- |
| `[1, 2, 3, 4]` | `[24, 12, 8, 6]` | `answer[0] = 2*3*4`, `answer[1] = 1*3*4`, and so on |
| `[-1, 1, 0, -3, 3]` | `[0, 0, 9, 0, 0]` | the zero wipes out every product except its own position |
| `[5, 2]` | `[2, 5]` | each position gets the other element |

## Constraints

- `2 <= nums.length <= 100000`
- `-30 <= nums[i] <= 30`
- Every prefix and suffix product fits in a 32-bit signed integer.

## Aim for

O(n) time. Bonus: O(1) extra space, not counting the output array.

## How to run

```
npm run submit -- 5
```

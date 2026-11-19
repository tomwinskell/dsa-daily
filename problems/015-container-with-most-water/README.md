# 15. Container With Most Water

**Medium** · Two Pointers · [LeetCode](https://leetcode.com/problems/container-with-most-water/)

You are given an array `height` of non-negative integers. Each value is the height of a vertical wall standing at
that index on a number line, so wall `i` runs from `(i, 0)` up to `(i, height[i])`.

Pick any two different walls. Together with the ground they form an open-topped container. Its width is the distance
between the two indices, and the water level is limited by the shorter of the two walls (walls in between are ignored).

Return the largest amount of water any pair of walls can hold, which is `width * min(left, right)`.

## Examples

| `height`                    | Result | Why                                                   |
| --------------------------- | ------ | ----------------------------------------------------- |
| `[1, 8, 6, 2, 5, 4, 8, 3, 7]` | `49`   | walls at index 1 and 8: width 7, shorter wall 7       |
| `[1, 1]`                    | `1`    | width 1, shorter wall 1                               |
| `[4, 3, 2, 1, 4]`           | `16`   | walls at index 0 and 4: width 4, shorter wall 4       |

## Constraints

- `2 <= height.length <= 100000`
- `0 <= height[i] <= 10000`

## Aim for

Linear time and constant extra space.

## How to run

```
npm run submit -- 15
```

# 12. Trapping Rain Water

**Hard** · Arrays & Hashing · [LeetCode](https://leetcode.com/problems/trapping-rain-water/)

You are given an array `height` of non-negative integers. Each value is the height of a one-unit-wide bar, and the bars
stand side by side with no gaps between them. After a heavy rain, water collects in the dips between taller bars. Return
the total number of units of water the terrain holds. Water can't spill over the two outer edges of the array: a bar
at either end only holds water if there is something taller on its other side to contain it.

## Examples

| height | result | Why |
| --- | --- | --- |
| `[0,1,0,2,1,0,1,3,2,1,2,1]` | `6` | water sits in the dips at the 0s and 1s that have a taller bar somewhere on each side |
| `[4,2,0,3,2,5]` | `9` | one wide basin between the 4 and the 5 |
| `[3,0,3]` | `3` | a single dip, three units tall by one wide |

## Constraints

- `1 <= height.length <= 100000`
- `0 <= height[i] <= 100000`

## Aim for

O(n) time. O(1) extra space is possible, but a working O(n) solution with O(n) space is a fine first goal.

## How to run

```
npm run submit -- 12
```

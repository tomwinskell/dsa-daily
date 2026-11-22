# 18. Rotate Image

**Medium** · Matrix · [LeetCode](https://leetcode.com/problems/rotate-image/)

You are given a square grid of numbers with `n` rows and `n` columns. Turn the grid a quarter turn clockwise, so
that the first row becomes the last column, the second row becomes the second-to-last column, and so on.

The change must happen **in place**: modify the grid you were given rather than building a new one. The function
returns nothing.

## Examples

| Input | After rotating |
| --- | --- |
| `[[1,2,3],[4,5,6],[7,8,9]]` | `[[7,4,1],[8,5,2],[9,6,3]]` |
| `[[1,2],[3,4]]` | `[[3,1],[4,2]]` |
| `[[5]]` | `[[5]]` |

## Constraints

- `1 <= n <= 1000`
- `-1000 <= matrix[i][j] <= 1000`
- The grid is always square.

## Aim for

O(n²) time and O(1) extra space.

## How to run

```
npm run submit -- 18
```

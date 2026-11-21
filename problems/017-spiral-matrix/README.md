# 17. Spiral Matrix

**Medium** · Matrix · [LeetCode](https://leetcode.com/problems/spiral-matrix/)

You are given a grid of integers with `m` rows and `n` columns. Return every value in the grid as a flat list, in the
order you would meet them by walking a spiral: start at the top-left cell and move right along the top row, then down
the right edge, then left along the bottom row, then up the left edge, then turn inward and keep going the same way
until every cell has been visited exactly once.

The grid is not necessarily square, and it may be a single row or a single column.

## Examples

| Grid                              | Result                         |
| --------------------------------- | ------------------------------ |
| `[[1,2,3],[4,5,6],[7,8,9]]`       | `[1,2,3,6,9,8,7,4,5]`          |
| `[[1,2,3,4],[5,6,7,8],[9,10,11,12]]` | `[1,2,3,4,8,12,11,10,9,5,6,7]` |
| `[[7],[9],[6]]`                   | `[7,9,6]`                      |

## Constraints

- `1 <= m, n <= 10` in the original problem; the tests here also use grids around 1000 by 1000
- `-100 <= grid[i][j] <= 100` in the original problem

## Aim for

Time proportional to the number of cells, visiting each cell once.

## How to run

```
npm run submit -- 17
```

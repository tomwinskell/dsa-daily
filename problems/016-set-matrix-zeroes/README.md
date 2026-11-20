# 16. Set Matrix Zeroes

**Medium** · Matrix · [LeetCode](https://leetcode.com/problems/set-matrix-zeroes/)

You are given a grid of integers with `m` rows and `n` columns. Whenever a cell holds `0`, every other cell in that
cell's row and in that cell's column must also become `0`.

Modify the grid in place. The function returns nothing. Only the zeros that were present in the original grid cause
changes: zeros you create while updating must not trigger further changes.

## Examples

| Input                               | Grid after the call                 |
| ----------------------------------- | ----------------------------------- |
| `[[1,1,1],[1,0,1],[1,1,1]]`         | `[[1,0,1],[0,0,0],[1,0,1]]`         |
| `[[0,1,2,0],[3,4,5,2],[1,3,1,5]]`   | `[[0,0,0,0],[0,4,5,0],[0,3,1,0]]`   |
| `[[5]]`                             | `[[5]]`                             |

## Constraints

- `1 <= m, n <= 200` in the original problem; the tests here also use grids around 1000 by 1000
- `-2^31 <= grid[i][j] <= 2^31 - 1`

## Aim for

Time proportional to the number of cells. Try to get the extra space down as far as you can; constant extra space is the
stretch goal, but a correct solution with a small amount of extra memory is a good first step.

## How to run

```
npm run submit -- 16
```

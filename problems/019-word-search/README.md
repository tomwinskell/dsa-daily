# 19. Word Search

**Medium** · Matrix · [LeetCode](https://leetcode.com/problems/word-search/)

You are given a rectangular grid of lowercase or uppercase letters and a target `word`. Decide whether the word can be
spelled by walking through the grid: start on any cell, then repeatedly step to a cell directly above, below, left or
right of the current one, reading one letter per cell. A single cell may be used at most once within one spelling of the
word. Return `true` if the word can be spelled this way, `false` otherwise.

## Examples

| board | word | result | Why |
| --- | --- | --- | --- |
| `[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]` | `"ABCCED"` | `true` | A → B → C along the top row, down to C, then D and E |
| `[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]` | `"SEE"` | `true` | S on the right edge, then the two E cells below it |
| `[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]` | `"ABCB"` | `false` | the only B would have to be used twice |

## Constraints

- `1 <= rows, cols <= 6`
- `1 <= word.length <= 15`
- the board and the word contain only English letters (case matters)

## Aim for

Something that stays fast even when the grid is full of repeated letters and the word almost, but not quite, matches.

## How to run

```
npm run submit -- 19
```

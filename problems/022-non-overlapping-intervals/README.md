# 22. Non-overlapping Intervals

**Medium** · Intervals · [LeetCode](https://leetcode.com/problems/non-overlapping-intervals/)

You are given a list of intervals, each written as `[start, end]`, in no particular order. Remove as few intervals as
possible so that no two of the remaining intervals overlap. Return how many you had to remove.

Two intervals overlap only if they share some stretch of time with positive length. Intervals that merely touch at an
endpoint (for example `[1, 2]` and `[2, 3]`) do **not** overlap.

## Examples

| Intervals | Output |
| --- | --- |
| `[[1,2],[2,3],[3,4],[1,3]]` | `1` |
| `[[1,2],[1,2],[1,2]]` | `2` |
| `[[1,2],[2,3]]` | `0` |

## Constraints

- `1 <= intervals.length <= 10^5`
- `intervals[i].length == 2`
- `-5 * 10^4 <= start < end <= 5 * 10^4`

## Aim for

`O(n log n)` time.

## How to run

```
npm run submit -- 22
```

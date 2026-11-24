# 20. Merge Intervals

**Medium** · Intervals · [LeetCode](https://leetcode.com/problems/merge-intervals/)

You are given a list of closed intervals, each written as `[start, end]`. Two intervals that overlap, or that merely
touch at a shared endpoint, count as one continuous stretch. Combine every such group into a single interval covering
the whole stretch, and return the resulting list sorted by start. The input list is not necessarily sorted.

## Examples

| intervals | result | Why |
| --- | --- | --- |
| `[[1,3],[2,6],[8,10],[15,18]]` | `[[1,6],[8,10],[15,18]]` | `[1,3]` and `[2,6]` overlap |
| `[[1,4],[4,5]]` | `[[1,5]]` | the two intervals touch at 4 |
| `[[5,6],[1,2],[3,4]]` | `[[1,2],[3,4],[5,6]]` | nothing overlaps; the output is sorted |

## Constraints

- `1 <= intervals.length <= 100000`
- `intervals[i].length == 2`
- `0 <= start <= end <= 1000000`

## Aim for

Comfortably handling a hundred thousand intervals, so anything that compares every pair of intervals will be too slow.

## How to run

```
npm run submit -- 20
```

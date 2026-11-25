# 21. Insert Interval

**Medium** · Intervals · [LeetCode](https://leetcode.com/problems/insert-interval/)

You are given a list of non-overlapping intervals, each written as `[start, end]`, already sorted by start. You are also
given one extra interval to add. Insert it so the list stays sorted and non-overlapping, merging the new interval with
any existing intervals it overlaps. Intervals that only touch at an endpoint (for example `[1, 2]` and `[2, 3]`) count
as overlapping.

Return the resulting list. Do not assume you need to re-sort the whole thing from scratch.

## Examples

| Intervals | New interval | Output |
| --- | --- | --- |
| `[[1,3],[6,9]]` | `[2,5]` | `[[1,5],[6,9]]` |
| `[[1,2],[3,5],[6,7],[8,10],[12,16]]` | `[4,8]` | `[[1,2],[3,10],[12,16]]` |
| `[]` | `[5,7]` | `[[5,7]]` |

## Constraints

- `0 <= intervals.length <= 10^5`
- `intervals[i].length == 2`
- `0 <= start <= end <= 10^6`
- `intervals` is sorted by start and contains no overlaps
- `newInterval.length == 2` and `0 <= start <= end <= 10^6`

## Aim for

Linear time in the number of intervals.

## How to run

```
npm run submit -- 21
```

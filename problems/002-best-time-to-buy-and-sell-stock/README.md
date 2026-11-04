# 2. Best Time to Buy and Sell Stock

**Easy** · Arrays & Hashing · [LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

`prices[i]` is the price of a stock on day `i`. You may make **one** purchase on some day and **one** sale on a *later* day. Return the largest profit you can make. If no profitable trade exists, return `0`.

## Examples

| `prices` | result | why |
| --- | --- | --- |
| `[7, 1, 5, 3, 6, 4]` | `5` | buy at 1, sell at 6 |
| `[7, 6, 4, 3, 1]` | `0` | prices only fall, so don't trade |

## Constraints

- `1 <= prices.length <= 1_000_000`
- `0 <= prices[i] <= 1_000_000_000`

## Aim for

A single pass over the array. The largest test has a million prices.

## How to run

Edit `solution.ts`, then `npm run submit -- 2` (or `npm run dev -- 2` to re-run on every save).

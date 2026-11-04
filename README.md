# dsa-daily

One data-structures-and-algorithms problem a day, in TypeScript. You write the answer in a file, run `submit`,
and a test suite tells you which cases pass and which don't. A scheduled Claude task adds the next problem each
morning and tells you about it.

## Quick start

```bash
npm install
npm run today            # current problem: statement + where to write your answer
npm run dev -- 1         # watch mode: re-runs the tests every time you save
npm run submit -- 1      # submit: runs the tests, records the attempt, marks it solved if everything passes
npm run stats            # streak, solved count, per-topic progress, unsolved backlog
```

Problems are addressed by their number in this repo (`1`, `001`), their slug (`two-sum`), or the full folder name.
With no argument, the commands use the most recently assigned problem.

## What's where

| Path | What it is |
| --- | --- |
| `problems/catalog.json` | The 100-problem list, in the order they're handed out |
| `problems/<NNN>-<slug>/` | One problem: `README.md`, `solution.ts` (you edit this), `solution.test.ts` |
| `progress.json` | Assignment dates, attempts and solve dates. Commit it: the daily routine reads it |
| `lib/structures.ts` | `ListNode`, `TreeNode` and array converters for list/tree problems |
| `lib/testing.ts` | `expectFast` (fails slow brute force) and `seededRandom` |
| `scripts/` | The `today`, `next`, `dev`, `submit` and `stats` commands |
| `AUTHORING.md` | How a problem gets written (used by the daily routine) |
| `ROUTINE.md` | What the daily scheduled task does |

## Notes

- Tests include a large input per problem. If your answer is correct but slow, you'll see the time limit in the failure message.
- `npm run submit -- --push` commits and pushes your solution and progress when you're done, so tomorrow's run knows where you are.
- The catalog is a curated list of commonly asked interview problems (roughly the Blind 75 plus extras), ordered by topic.
  Reorder entries in `catalog.json` to change what comes next; the `order` field is the permanent ID, so don't renumber it.
- Problem statements and tests are written fresh for this repo. The LeetCode link on each is where to read the original.

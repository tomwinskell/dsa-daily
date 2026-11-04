# Authoring a problem

Each problem lives in `problems/<NNN>-<slug>/` and has four files. The daily routine writes the three that
aren't `meta.json` when a problem hasn't been written up yet (`npm run next` reports `"authored": false`).

```
problems/012-top-k-frequent-elements/
  meta.json            created by `npm run next -- --assign`
  README.md            the problem statement
  solution.ts          the stub the user edits
  solution.test.ts     vitest tests, run by `npm run submit`
```

## README.md

- Written in your own words. Do **not** paste LeetCode's statement or examples verbatim.
- Start with `# <order>. <Title>`, then `**Difficulty** · Topic · [LeetCode](url)`. Use the catalog `order`, not the LeetCode number.
- Sections: short description, `## Examples` (3 is plenty, a table works well), `## Constraints`, `## Aim for`
  (the complexity target, without naming the technique), `## How to run` (the `npm run submit -- <order>` line).
- No hints that give away the approach. If a hint is useful, put it under a collapsed `<details>` block.
- Never leave the text `AUTHOR_ME` in a finished README (the tooling treats it as "not written up yet").

## solution.ts (the stub)

- One exported function (or class for design problems) with typed parameters and return type, a short doc comment,
  and a body that is exactly `throw new Error('Not implemented');` after a `// TODO: write your solution here` line.
- For linked lists and trees, import from `../../lib/structures` (`ListNode`, `TreeNode`).
- The stub must typecheck (`npm run typecheck`) and every test must **fail** against it.

## solution.test.ts

- vitest: `import { describe, expect, it } from 'vitest'` and `import { fn } from './solution'`.
- At least 8 tests: the examples from the README, edge cases (empty, single element, duplicates, negatives,
  limits), and **one large-input test wrapped in `expectFast(() => ..., ms)`** from `../../lib/testing` so a brute-force
  answer fails instead of passing slowly. Use `seededRandom` for any random data so runs are reproducible.
- When several answers are valid (any index order, any permutation), assert with a validator function rather than an
  exact value.
- Don't embed a reference solution or an oracle that reveals the algorithm. Build large inputs with a known answer.
- Linked lists / trees: build inputs with `listFromArray` / `treeFromArray`, compare outputs with `listToArray` / `treeToArray`.
- Design problems (LRU Cache, Trie, Min Stack...): drive the class with operation sequences and assert on each result.
- Descriptive test titles. They are what the user sees when something fails.

## Verify before committing

1. Write a correct reference solution to the scratchpad directory (never into the repo), copy it over `solution.ts`,
   and confirm every test passes.
2. Restore the stub and confirm every test fails.
3. Run `npm run typecheck`.
4. Make sure no reference solution or scratch file is staged: `git status` should show only the new problem folder
   and `progress.json`.

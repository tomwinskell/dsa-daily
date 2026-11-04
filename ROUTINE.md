# Daily routine

This is what the scheduled task does every day. Each run starts in a fresh session, so everything it needs to know
lives in this repo (`progress.json` is the memory).

1. **Sync.** `git pull --ff-only`. Run `npm ci` if `node_modules/` is missing.
2. **Pick today's problem.** `npm run next -- --assign` and read the JSON it prints.
   - `"done": true` means the catalog is finished. Tell Tom, suggest adding more problems to `problems/catalog.json`, and stop.
   - Same-day runs are idempotent: running it twice gives the same problem.
3. **Write it up if needed.** If `"authored": false`, follow `AUTHORING.md` to create `README.md`, `solution.ts` and
   `solution.test.ts` in `dir`, then verify (reference solution passes, stub fails, typecheck passes).
   If `"authored": true`, leave the folder alone.
4. **Never touch Tom's work.** Don't edit or overwrite `solution.ts` in a problem that has attempts in `progress.json`.
5. **Commit and push.** Stage only the new problem folder and `progress.json`. Message: `Add problem <order>: <Title>`.
   Push to `main`.
6. **Send Tom the daily message** (channel: see the scheduled task's prompt). Keep it short:
   - Title, difficulty, topic, LeetCode link
   - How to start: `git pull && npm run today`, then `npm run dev -- <order>` to test on every save
     or `npm run submit -- <order>` to submit
   - One line of status from `npm run stats` (streak, solved count, unsolved backlog)
   - No hints and no spoilers.

If anything fails (push rejected, tests don't verify, message can't send), say so plainly in the final output instead of
retrying in a loop.

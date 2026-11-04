// Show the current problem: where to write the answer, and the problem statement.
import fs from 'node:fs';
import path from 'node:path';
import { dirOf, idOf, isAuthored, loadProgress, rel, resolveEntry, urlOf } from './shared.ts';

try {
  const entry = resolveEntry(process.argv[2]);
  const id = idOf(entry);
  const rec = loadProgress().problems[id];
  const dir = dirOf(entry);

  console.log(`\n${entry.order}. ${entry.title}  [${entry.difficulty} · ${entry.topic}]`);
  console.log(`LeetCode: ${urlOf(entry)}`);
  if (rec) {
    console.log(
      rec.solvedOn
        ? `Status:   solved on ${rec.solvedOn} (${rec.attempts.length} attempt${rec.attempts.length === 1 ? '' : 's'})`
        : `Status:   not solved yet (${rec.attempts.length} attempt${rec.attempts.length === 1 ? '' : 's'})`,
    );
  }

  if (!isAuthored(entry)) {
    console.log('\nThis problem has not been written up yet. The daily routine fills in the README, stub and tests.');
    console.log(`Folder: ${rel(dir)}`);
  } else {
    console.log(`\nWrite your answer in:  ${rel(path.join(dir, 'solution.ts'))}`);
    console.log(`Run the tests with:    npm run submit -- ${entry.order}`);
    console.log(`Or watch as you type:  npm run dev -- ${entry.order}\n`);
    console.log(fs.readFileSync(path.join(dir, 'README.md'), 'utf8'));
  }
} catch (err) {
  console.error((err as Error).message);
  process.exit(1);
}

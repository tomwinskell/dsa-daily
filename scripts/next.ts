// Pick the next problem from the catalog.
//
//   npm run next              show what the next problem would be (no changes)
//   npm run next -- --assign  record it as today's problem (idempotent: same day, same problem)
//
// Always prints one JSON object on stdout so the daily routine can read it.
import fs from 'node:fs';
import {
  dirOf,
  idOf,
  isAuthored,
  loadCatalog,
  loadProgress,
  rel,
  saveProgress,
  today,
  urlOf,
} from './shared.ts';

const assign = process.argv.includes('--assign');
const catalog = loadCatalog();
const progress = loadProgress();
const day = today();

// If something was already assigned today, that is today's problem.
const alreadyToday = catalog.find((e) => progress.problems[idOf(e)]?.assignedOn === day);
const next = alreadyToday ?? catalog.find((e) => !progress.problems[idOf(e)]);

if (!next) {
  console.log(JSON.stringify({ done: true, message: 'Every problem in the catalog has been assigned.' }));
  process.exit(0);
}

const id = idOf(next);
if (assign && !alreadyToday) {
  fs.mkdirSync(dirOf(next), { recursive: true });
  fs.writeFileSync(
    `${dirOf(next)}/meta.json`,
    JSON.stringify({ ...next, id, url: urlOf(next) }, null, 2) + '\n',
  );
  progress.problems[id] = { assignedOn: day, solvedOn: null, attempts: [] };
  saveProgress(progress);
}

const unsolvedBacklog = catalog.filter((e) => {
  const rec = progress.problems[idOf(e)];
  return rec && rec.solvedOn === null && idOf(e) !== id;
}).length;

console.log(
  JSON.stringify(
    {
      id,
      title: next.title,
      difficulty: next.difficulty,
      topic: next.topic,
      leetcode: urlOf(next),
      dir: rel(dirOf(next)),
      assignedToday: Boolean(alreadyToday) || assign,
      authored: isAuthored(next),
      unsolvedBacklog,
      remaining: catalog.filter((e) => !progress.problems[idOf(e)] && idOf(e) !== id).length,
    },
    null,
    2,
  ),
);

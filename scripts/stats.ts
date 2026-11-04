// Progress summary: streak, solved count, per-topic breakdown, unsolved backlog.
import { addDays, idOf, loadCatalog, loadProgress, today } from './shared.ts';

const catalog = loadCatalog();
const progress = loadProgress();
const day = today();

const records = catalog.map((e) => ({ e, rec: progress.problems[idOf(e)] }));
const solved = records.filter((r) => r.rec?.solvedOn);
const assigned = records.filter((r) => r.rec);
const backlog = assigned.filter((r) => !r.rec!.solvedOn);

// Streak: consecutive calendar days with at least one solve, ending today (or yesterday if today isn't solved yet).
const solvedDays = new Set(solved.map((r) => r.rec!.solvedOn!));
let cursor = solvedDays.has(day) ? day : addDays(day, -1);
let streak = 0;
while (solvedDays.has(cursor)) {
  streak++;
  cursor = addDays(cursor, -1);
}

console.log(`\nSolved ${solved.length}/${catalog.length}   ·   Streak: ${streak} day${streak === 1 ? '' : 's'}   ·   Assigned: ${assigned.length}\n`);

const topics = [...new Set(catalog.map((e) => e.topic))];
const width = Math.max(...topics.map((t) => t.length));
for (const topic of topics) {
  const inTopic = records.filter((r) => r.e.topic === topic);
  const done = inTopic.filter((r) => r.rec?.solvedOn).length;
  const bar = '█'.repeat(done) + '░'.repeat(inTopic.length - done);
  console.log(`${topic.padEnd(width)}  ${String(done).padStart(2)}/${String(inTopic.length).padEnd(2)} ${bar}`);
}

if (backlog.length) {
  console.log(`\nAssigned but not solved (${backlog.length}):`);
  for (const { e, rec } of backlog) {
    console.log(`  ${e.order}. ${e.title} (${e.difficulty}, assigned ${rec!.assignedOn}, ${rec!.attempts.length} attempts)`);
  }
}
console.log();

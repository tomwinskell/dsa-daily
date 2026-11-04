// Submit your answer: runs the problem's tests, prints a verdict, records the attempt in progress.json.
//
//   npm run submit              submit the current problem
//   npm run submit -- 12        submit problem 12 (number, slug or full id also work)
//   npm run submit -- --push    also commit and push progress + your solution when it passes
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, idOf, isAuthored, loadProgress, rel, resolveEntry, saveProgress, today, dirOf } from './shared.ts';

type AssertionResult = { title: string; ancestorTitles?: string[]; status: string; failureMessages?: string[] };
type VitestJson = {
  numTotalTests: number;
  numPassedTests: number;
  numFailedTests: number;
  testResults: { message?: string; assertionResults: AssertionResult[] }[];
};

const args = process.argv.slice(2);
const push = args.includes('--push');
const target = args.find((a) => !a.startsWith('--'));

function firstLines(text: string, n: number): string {
  return text
    .split('\n')
    .filter((l) => l.trim() && !l.includes('node_modules') && !/^\s*at\s/.test(l))
    .slice(0, n)
    .join('\n');
}

try {
  const entry = resolveEntry(target);
  const id = idOf(entry);
  if (!isAuthored(entry)) {
    console.error(`${entry.title} hasn't been written up yet (no README/stub/tests), so there is nothing to test.`);
    process.exit(1);
  }

  const outFile = path.join(ROOT, '.submit-result.json');
  fs.rmSync(outFile, { force: true });
  const vitest = path.join(ROOT, 'node_modules', '.bin', 'vitest');
  spawnSync(vitest, ['run', `problems/${id}/`, '--reporter=json', `--outputFile=${outFile}`], {
    cwd: ROOT,
    stdio: ['ignore', 'ignore', 'pipe'],
    encoding: 'utf8',
  });

  if (!fs.existsSync(outFile)) {
    console.error('The test runner produced no result. Is your solution.ts valid TypeScript?');
    process.exit(1);
  }
  const result: VitestJson = JSON.parse(fs.readFileSync(outFile, 'utf8'));
  fs.rmSync(outFile, { force: true });

  console.log(`\n${entry.order}. ${entry.title}  [${entry.difficulty}]\n`);

  const asserts = result.testResults.flatMap((r) => r.assertionResults);
  if (result.numTotalTests === 0) {
    // The file failed to load (syntax error, bad import...).
    const msg = result.testResults.map((r) => r.message).filter(Boolean).join('\n');
    console.log('✗ Your code could not be loaded:\n');
    console.log(firstLines(msg || 'unknown error', 12));
  } else {
    for (const a of asserts) {
      const name = [...(a.ancestorTitles ?? []).slice(1), a.title].join(' › ');
      const ok = a.status === 'passed';
      console.log(`${ok ? '✓' : '✗'} ${name}`);
      if (!ok && a.failureMessages?.length) {
        const detail = firstLines(a.failureMessages[0].replace(/\u001b\[[0-9;]*m/g, ''), 4);
        console.log(detail.split('\n').map((l) => `    ${l}`).join('\n'));
      }
    }
  }

  const { numPassedTests: passed, numFailedTests: failed, numTotalTests: total } = result;
  const allPassed = total > 0 && failed === 0;
  console.log(`\n${allPassed ? '🎉 All tests passed' : 'Not there yet'}: ${passed}/${total} passed.`);

  const progress = loadProgress();
  const rec = (progress.problems[id] ??= { assignedOn: today(), solvedOn: null, attempts: [] });
  rec.attempts.push({ at: new Date().toISOString(), passed, failed, total });
  const firstSolve = allPassed && !rec.solvedOn;
  if (firstSolve) rec.solvedOn = today();
  saveProgress(progress);
  if (firstSolve) console.log(`Marked solved (attempt ${rec.attempts.length}). Run \`npm run stats\` to see your streak.`);

  if (push) {
    const git = (...a: string[]) => spawnSync('git', a, { cwd: ROOT, encoding: 'utf8' });
    git('add', 'progress.json', rel(dirOf(entry)));
    const commit = git('commit', '-m', `${allPassed ? 'Solve' : 'Attempt'} ${entry.order}. ${entry.title}`);
    const pushed = git('push');
    console.log(commit.status === 0 ? 'Committed.' : 'Nothing new to commit.');
    console.log(pushed.status === 0 ? 'Pushed.' : `Push failed: ${firstLines(pushed.stderr, 2)}`);
  } else if (firstSolve) {
    console.log('Tip: `npm run submit -- --push` commits and pushes so tomorrow\'s routine sees your progress.');
  }

  process.exit(allPassed ? 0 : 1);
} catch (err) {
  console.error((err as Error).message);
  process.exit(1);
}

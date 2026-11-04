// Watch mode: re-runs the problem's tests every time you save solution.ts.
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { ROOT, idOf, isAuthored, resolveEntry } from './shared.ts';

try {
  const entry = resolveEntry(process.argv[2]);
  if (!isAuthored(entry)) {
    console.error(`${entry.title} hasn't been written up yet (no README/stub/tests). Nothing to watch.`);
    process.exit(1);
  }
  console.log(`Watching ${entry.order}. ${entry.title} - edit problems/${idOf(entry)}/solution.ts\n`);
  const vitest = path.join(ROOT, 'node_modules', '.bin', 'vitest');
  const result = spawnSync(vitest, ['--watch', `problems/${idOf(entry)}/`], { cwd: ROOT, stdio: 'inherit' });
  process.exit(result.status ?? 0);
} catch (err) {
  console.error((err as Error).message);
  process.exit(1);
}

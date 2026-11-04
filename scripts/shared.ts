import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const PROBLEMS_DIR = path.join(ROOT, 'problems');
const CATALOG_FILE = path.join(PROBLEMS_DIR, 'catalog.json');
const PROGRESS_FILE = path.join(ROOT, 'progress.json');

/** Dates in progress.json are calendar days in this zone. Override with DSA_TZ. */
export const TZ = process.env.DSA_TZ ?? 'America/Toronto';

export type Entry = {
  order: number;
  lc: number;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
};

export type Attempt = { at: string; passed: number; failed: number; total: number };
export type ProblemRecord = { assignedOn: string; solvedOn: string | null; attempts: Attempt[] };
export type Progress = { problems: Record<string, ProblemRecord> };

export const idOf = (e: Entry) => `${String(e.order).padStart(3, '0')}-${e.slug}`;
export const urlOf = (e: Entry) => `https://leetcode.com/problems/${e.slug}/`;
export const dirOf = (e: Entry) => path.join(PROBLEMS_DIR, idOf(e));

export function today(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: TZ });
}

export function addDays(day: string, delta: number): string {
  const [y, m, d] = day.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + delta));
  return dt.toISOString().slice(0, 10);
}

export function loadCatalog(): Entry[] {
  return JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
}

export function loadProgress(): Progress {
  if (!fs.existsSync(PROGRESS_FILE)) return { problems: {} };
  return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
}

export function saveProgress(progress: Progress): void {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2) + '\n');
}

/** A problem is "authored" once its README, stub and tests all exist and the README has no TODO marker. */
export function isAuthored(e: Entry): boolean {
  const dir = dirOf(e);
  const readme = path.join(dir, 'README.md');
  if (!fs.existsSync(path.join(dir, 'solution.ts'))) return false;
  if (!fs.existsSync(path.join(dir, 'solution.test.ts'))) return false;
  if (!fs.existsSync(readme)) return false;
  return !fs.readFileSync(readme, 'utf8').includes('AUTHOR_ME');
}

/** Resolve a CLI argument ("1", "001", "two-sum", full id) to a catalog entry. Defaults to the latest assignment. */
export function resolveEntry(arg?: string): Entry {
  const catalog = loadCatalog();
  if (arg) {
    const needle = arg.toLowerCase();
    const found =
      catalog.find((e) => idOf(e) === needle) ??
      catalog.find((e) => e.slug === needle) ??
      catalog.find((e) => String(e.order) === String(Number(needle))) ??
      catalog.find((e) => idOf(e).startsWith(needle));
    if (!found) throw new Error(`No problem matches "${arg}". Try a number like 1, a slug like two-sum, or a full id.`);
    return found;
  }
  const progress = loadProgress();
  const assigned = catalog
    .filter((e) => progress.problems[idOf(e)])
    .sort((a, b) => {
      const da = progress.problems[idOf(a)].assignedOn;
      const db = progress.problems[idOf(b)].assignedOn;
      return da === db ? a.order - b.order : da.localeCompare(db);
    });
  if (assigned.length === 0) {
    throw new Error('Nothing has been assigned yet. Run `npm run next -- --assign` to get your first problem.');
  }
  return assigned[assigned.length - 1];
}

export function rel(p: string): string {
  return path.relative(ROOT, p);
}

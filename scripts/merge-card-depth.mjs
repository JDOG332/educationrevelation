// Merge drafted card depth (intuition = Deeper, advanced = Full Picture) into
// lib/topicCards.js. Usage: node scripts/merge-card-depth.mjs <dir with out-<door>.json>
// Idempotent: writes only the two fields, keeps every other field and the
// file's 2-space JSON layout.
import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) { console.error('need the directory of out-<door>.json files'); process.exit(1); }

const SLUG_TO_KEY = {
  love: 'filter', mysticism: 'plain', consciousness: 'ancient', religion: 'sameness',
  art: 'depths', nature: 'pillars', mythology: 'gravity', philosophy: 'layers',
  science: 'rock', mathematics: 'promise',
};

const file = new URL('../lib/topicCards.js', import.meta.url);
const src = fs.readFileSync(file, 'utf8');
const head = src.slice(0, src.indexOf('{'));
const data = JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1));

const wc = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;
let changed = 0, missing = 0;
for (const [slug, key] of Object.entries(SLUG_TO_KEY)) {
  const p = path.join(dir, `out-${slug}.json`);
  if (!fs.existsSync(p)) { console.log(`skip ${slug}: no file`); continue; }
  const rows = JSON.parse(fs.readFileSync(p, 'utf8'));
  let n = 0;
  for (const row of rows) {
    const card = (data[key]?.[row.room] || []).find((c) => c.id === row.id);
    if (!card) { missing++; console.log(`  missing ${slug}/${row.room}/${row.id}`); continue; }
    for (const f of ['intuition', 'advanced']) {
      const t = row[f];
      if (typeof t !== 'string' || wc(t) < 60) continue;
      if (/[—–]/.test(t)) continue; // no em or en dashes in new copy
      card[f] = t.trim(); n++; changed++;
    }
  }
  console.log(`${slug}: ${rows.length} rows, ${n} fields written`);
}
fs.writeFileSync(file, head + JSON.stringify(data, null, 2) + ';\n');
console.log(`done: ${changed} fields changed, ${missing} rows unmatched`);

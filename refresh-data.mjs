#!/usr/bin/env node
/**
 * Refresh dashboard data from LankaPack Zennix ERP
 * Run: node refresh-data.mjs
 */

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, 'data');

const sources = [
  { cmd: 'list_customers', file: 'customers.json' },
  { cmd: 'list_job_cards', file: 'job_cards.json' },
  { cmd: 'list_invoices', file: 'invoices.json' },
  { cmd: 'get_raw_material_stock status=all', file: 'stock.json' },
  { cmd: 'get_raw_material_stock status=in', file: 'stock_in.json' },
  { cmd: 'get_raw_material_stock status=out', file: 'stock_out.json' },
];

for (const { cmd, file } of sources) {
  try {
    const fullCmd = `mcporter call lankapack-zennix-erp.${cmd} --output json`;
    const out = execSync(fullCmd, { encoding: 'utf8', timeout: 60000, shell: 'powershell' });
    const json = JSON.parse(out);
    writeFileSync(join(dataDir, file), JSON.stringify(json, null, 2), 'utf8');
    console.log(`✅ ${file} — ${Array.isArray(json) ? json.length : 'OK'}`);
  } catch (e) {
    console.error(`❌ ${file} — ${e.message.slice(0, 80)}`);
  }
}

console.log('\n✅ Dashboard data refreshed! Commit and push to update GitHub Pages.');

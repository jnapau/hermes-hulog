// Interactive server-only bootstrap. Secret inputs are hidden and never written to disk.
import { readFileSync } from 'node:fs';

async function hiddenInput(label) {
  if (!process.stdin.isTTY) throw new Error('Run this command in an interactive terminal.');
  process.stdout.write(label);
  process.stdin.setRawMode(true);
  process.stdin.setEncoding('utf8');
  process.stdin.resume();
  return new Promise((resolve, reject) => {
    let value = '';
    function finish(error) {
      process.stdin.off('data', onData);
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdout.write('\n');
      if (error) reject(error); else resolve(value);
    }
    function onData(chunk) {
      for (const char of chunk) {
        if (char === '\u0003') { finish(new Error('Setup cancelled.')); return; }
        if (char === '\r' || char === '\n') { finish(); return; }
        if (char === '\u007f' || char === '\b') value = value.slice(0, -1);
        else if (char >= ' ') value += char;
      }
    }
    process.stdin.on('data', onData);
  });
}

let projectUrl = process.env.SUPABASE_URL;
if (!projectUrl) {
  try {
    const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
    projectUrl = env.match(/^VITE_SUPABASE_URL=(.+)$/m)?.[1].trim();
  } catch { /* use the explicitly supplied project below */ }
}
projectUrl ||= 'https://edyyjnpudcwgbthxuikl.supabase.co';
const previous = Object.fromEntries(['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'HULOG_ADMIN_PASSWORD'].map(key => [key, process.env[key]]));
try {
  console.log(`Initialize Hulog administrator for ${projectUrl}`);
  process.env.SUPABASE_URL = projectUrl;
  process.env.SUPABASE_SERVICE_ROLE_KEY = String(await hiddenInput('Paste the service_role / secret API key, then press Enter (hidden): ')).trim();
  process.env.HULOG_ADMIN_PASSWORD = String(await hiddenInput('Enter the initial hermeshulog administrator password, then press Enter (hidden): '));
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.HULOG_ADMIN_PASSWORD.length < 8) throw new Error('Provide a server secret key and an administrator password of at least 8 characters.');
  await import('./seed.mjs');
} catch (error) {
  // Print only the error message; SDK error objects can contain request details.
  console.error(error instanceof Error ? error.message : 'Setup failed. Check the project and server key, then retry.');
  process.exitCode = 1;
} finally {
  for (const [key, value] of Object.entries(previous)) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
}

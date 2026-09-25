import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const commands = [
  { name: 'backend', file: join(rootDir, 'backend', 'server.js') },
  { name: 'vite', file: join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js') },
];

const children = commands.map(({ name, file }) => {
  const child = spawn(process.execPath, [file], {
    cwd: rootDir,
    stdio: 'inherit',
  });
  child.on('exit', (code, signal) => {
    if (!stopping) {
      console.error(`[${name}] encerrou (${signal || `código ${code}`}).`);
      shutdown(code || 1);
    }
  });
  return child;
});

let stopping = false;
function shutdown(exitCode = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill('SIGTERM');
  process.exitCode = exitCode;
}

process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());

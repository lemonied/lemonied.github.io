import fs from 'fs';
import { exec } from 'child_process';
import * as glob from 'glob';
import path from 'path';
import { toPosixPath } from '@lemonied/utils';

const MDX_PATH = toPosixPath(
  path.resolve(process.cwd(), './blog/src/pages/article/**/*.mdx'),
);

function getLastCommitTime(file: string) {
  return new Promise<Date | null>((resolve, reject) => {
    exec(`git log -1 --format="%ai" -- ${file}`, (error, stdout) => {
      if (error) {
        return reject(error);
      }
      const str = stdout.trim();
      resolve(str ? new Date(str) : null);
    });
  });
}

async function mtime() {
  const files = glob.sync(MDX_PATH);
  for (const file of files) {
    const time = await getLastCommitTime(file);
    const stat = fs.statSync(file);
    if (time) {
      fs.utimesSync(file, stat.atime, time);
    }
  }
}

// eslint-disable-next-line no-console
console.time();
mtime().then(() => {
  // eslint-disable-next-line no-console
  console.log('mtime 执行完毕');
  // eslint-disable-next-line no-console
  console.timeEnd();
}).catch(error => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});

import { exec } from 'child_process';

const name = process.argv[2];

if (!name) {
  console.error('❌ Please provide the name of the migration.');
  process.exit(1);
}
const path = `src/database/migrations/${name}`;
const command = `npx typeorm migration:create ${path}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  console.log(stdout);
});

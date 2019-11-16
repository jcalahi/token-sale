import http from 'http';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  console.log(line);
});

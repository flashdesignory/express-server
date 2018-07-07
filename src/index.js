import open from 'open';
import os from 'os';
import chalk from 'chalk';
import http from 'http';

import app from './server';

const server = http.createServer(app);
let currentApp = app;

function getExternalIp() {
  const ifaces = os.networkInterfaces();
  let addresses = [];
  for (const dev in ifaces) { // eslint-disable-line
    const result = ifaces[dev].filter(details => details.family === 'IPv4' && details.internal === false && details.address !== undefined);
    if (result && result.length > 0) {
      addresses = [...addresses, ...result];
    }
  }

  return addresses[0].address;
}

const host = getExternalIp();
const port = 8080;

server.listen(port, host, () => {
  var url = `http://${host}:${port}`;

  console.log();
  console.log(chalk.green('*******************************************'));
  console.log();
  console.log(chalk.cyan(`listening at: ${url}`));
  console.log();
  console.log(chalk.green('*******************************************'));
  console.log();

  open(url);
});

if (module.hot) {
  module.hot.accept(['./server'], () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}

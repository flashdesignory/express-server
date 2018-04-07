import open from 'open';
import os from 'os';
import chalk from 'chalk';
import http from 'http';
import { createServer } from 'http';

import app from './server';

const server = http.createServer(app);
let currentApp = app;

function getExternalIp(){
	let address;
	let ifaces = os.networkInterfaces();
	let addresses = [];
	for (let dev in ifaces) {
		ifaces[dev].filter(function(details){
			if(details.family === 'IPv4' && details.internal === false && details.address != undefined){
				addresses.push(details.address);
			}
		})
	}
	return addresses[0];
}

const host = getExternalIp();
const port = 8080;

server.listen(port, host,  () => {

	var url = 'http://' + host + ':' + port;

	console.log();
	console.log(chalk.green("*******************************************"));
	console.log();
	console.log(chalk.cyan("listening at: " + url));
	console.log();
	console.log(chalk.green("*******************************************"));
	console.log();

	open(url);
})

if (module.hot) {
	module.hot.accept(['./server'], () => {
		server.removeListener('request', currentApp)
		server.on('request', app)
		currentApp = app
	})
}

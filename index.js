const express = require('express');
const path = require('path');
const chalk = require('chalk');

const app = express();

function getExternalIp(){
	let address;
	let ifaces = require('os').networkInterfaces();
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

//local vars
app.locals.title = 'express server';

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send('hello world!!!');
});

app.listen(port, host, (err, result) => {
		if(err){
			return console.log(err);
		}

		var url = 'http://' + host + ':' + port;

		console.log();
		console.log(chalk.green("*******************************************"));
		console.log();
		console.log(chalk.cyan("listening at: " + url));
		console.log();
		console.log(chalk.green("*******************************************"));
		console.log();
	}
)
const express = require('express');
const app = express();

const rateLimiter = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const connect = require('./db/connect');

app.use([
	express.json(),
	express.urlencoded({ extended: true }),
	cookieParser()
]);

const signup = require('./routes/signup');
const login = require('./routes/login');
const verifyCode = require('./routes/verifyCode');
const retrieveDatabase = require('./routes/retrieveDatabase');

app.use('/api/signup', signup);
app.use('/api/login', login);
app.use('/api/verify-code', verifyCode);
app.use('/api/retrieve-database', retrieveDatabase);

const PORT = process.env.PORT || 3000; // process.env.PORT is there in case the service has reserved a port already, 3000 is just default if there ain't

async function start() {
	try {
		console.log(await connect('mongodb://127.0.0.1/cco'));

		app.listen(PORT, () => {
			console.log('Server on ' + PORT);
		});
	} catch(err) {
		console.log(err);
	}
}

start();

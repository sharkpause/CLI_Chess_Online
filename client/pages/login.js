import chalk from 'chalk';
import axios from 'axios';

import { input, password } from '@inquirer/prompts';

import parseCookie from '../utils/parseCookie.js';

import API_ROUTE from '../.apiroute.js';

async function loginUI() {
	let errorMessage = '';

	while(true) {
		console.clear();
		
		console.log(chalk.cyanBright('Log into your CLI Chess Online account!\n'));

		if(errorMessage !== '') console.log(chalk.red(errorMessage), '\n');

		const usernameInput = await input({
			message: 'Username: '
		});
		const passwordInput = await password({
			message: 'Password: '
		});
		
		if(!/^[a-zA-Z0-9_]+$/.test(usernameInput) || usernameInput > 30 || usernameInput < 3) {
			errorMessage = 'Username must only be composed of alphanumeric characters and underscores and be shorter than 30 characters and longer than 3 characters';
		} else if(password.length > 50) {
			errorMessage = 'Password must be less than or equal to 50 characters';
		} else {
			console.log(chalk.cyan('\nLogging in...Please wait patiently'));

			const response = await loginUser(usernameInput, passwordInput);
			const result = response[0];
			const cookie = response[1];

			if(result.code === 0) {
				const parsedCookie = parseCookie(cookie);

				process.env.COOKIE_JWT = parsedCookie['jwtToken'];
				process.env.COOKIE_USERNAME = parsedCookie['username'];

				return;
			} else {
				errorMessage = result.message;
			}
		}
	}
}

async function loginUser(username, password) {
	try {
		const response = await axios.post(API_ROUTE + '/login', { username, password });
		
		return [response.data, response.headers['set-cookie']];
	} catch(err) {
		return err.response.data;
	}
}

export default loginUI;

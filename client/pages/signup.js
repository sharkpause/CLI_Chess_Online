import chalk from 'chalk';
import axios from 'axios';

import { input, password, confirm } from '@inquirer/prompts';

import askRetry from '../utils/askRetry.js';

import API_ROUTE from '../.apiroute.js';

async function signUpUI() {
	let errorMessage = '';

	while(true) {
		console.clear();

		console.log(chalk.cyanBright('Create a CLI Chess Online account!\n'));

		if(errorMessage !== '') {
			console.log(chalk.red(errorMessage), '\n');

			if(await askRetry() === false) return;
		}

		const usernameInput = await input({
			message: 'Username: '
		});
		const emailInput = await input({
			message: 'Email: '
		});
		const passwordInput = await password({
			message: 'Password: '
		});
		
		if(!/^[a-zA-Z0-9_]+$/.test(usernameInput) || usernameInput > 30 || usernameInput < 3) {
			errorMessage = 'Username must only be composed of alphanumeric characters and underscores and be shorter than 30 characters and longer than 3 characters';
		} else if(!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/gm.test(emailInput)) {
			errorMessage = 'Invalid email address!';
		} else if(passwordInput.length > 50) {
			errorMessage = 'Password must be less than or equal to 50 characters';
		} else {
			console.log(chalk.cyan('\nSending email with the verification code...Please wait patiently'));

			const result = await signUpUser(usernameInput, emailInput, passwordInput);
			
			if(result.code == 0) {
				await verifyCodeUI(usernameInput, emailInput, passwordInput);
				break; // break to send user back to main menu after verify
			} else {
				errorMessage = result.message;
			}
		}
	}
}

async function verifyCodeUI(username, email, password) {
	let errorMessage = '';

	while(true) {
		console.clear();

		if(errorMessage) {
			console.log(chalk.red(errorMessage) + '\n');

			if(await askRetry() === false) return;
		}
		
		const gotCode = await confirm({
			message: chalk.cyan('Have you received the email with the code?')
		});

		console.log(); // empty console.log()'s are for UI purposes

		if(gotCode === false) {
			const resendCode = await confirm({
				message: chalk.cyan('Would you like the code to be resent?')
			});

			if(resendCode === true) {
				await signUpUser(username, email, password);
			} else {
				return;
			}
		} else {
			const verificationCodeInput = await input({
				message: chalk.cyan('Please input the code you received in the email: ')
			});

			const result = await verifyCode(verificationCodeInput);

			if(result.code === 0) {
				break;
			} else {
				errorMessage = result.message;
			}
		}
	}

}

async function verifyCode(code) {
	try {
		const response = await axios.post(API_ROUTE + '/verify-code', { code });

		return response.data;
	} catch(err) {
		return err.response.data;
	}
}

async function signUpUser(username, email, password) {
	try {
		const response = await axios.post(API_ROUTE + '/signup', {
			username, email, password
		});

		return response.data;
	} catch(err) {
		return err.response.data;
	}
}

export default signUpUI;

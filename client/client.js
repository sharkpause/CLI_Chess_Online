#! /usr/bin/env node

import chalk from 'chalk';
import axios from 'axios';

import { show, hide } from 'alternate-screen';
import { select, input, password, confirm, Separator } from '@inquirer/prompts';

show();

async function mainMenuUI() {
	console.clear();
	const mainMenuAnswer = await select({
		message: `Welcome to ${chalk.cyanBright('CLI Chess Online!')}\n`,
		choices: [
			{
				name: 'Play a game',
				value: 'play',
			},
			new Separator(),
			{
				name: 'Log in',
				value: 'login'
			},
			{
				name: 'Sign up',
				value: 'signup'
			},
			new Separator(),
			{
				name: 'Quit',
				value: 'quit'
			}
		]
	});

	if(mainMenuAnswer === 'signup') signUpUI();
	else if(mainMenuAnswer === 'login') loginUI();
}

async function signUpUI() {
	let errorMessage = '';

	while(true) {
		console.clear();
		console.log(chalk.cyanBright('Create a CLI Chess Online account!\n'));

		if(errorMessage !== '') console.log(chalk.red(errorMessage), '\n');

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
		} else {
			console.log(chalk.cyan('\nSending email with the verification code...Please wait patiently'));
			const result = await signUpUser(usernameInput, emailInput, passwordInput);
			
			if(result == 1) {
				errorMessage = 'Username already in use!';
			} else if(result == 2) {
				errorMessage = 'Email already in use!';
			} else if(result == 0) {
				verifyCodeUI(usernameInput, emailInput, passwordInput);
				break;
			}
		}
	}
}

async function verifyCodeUI(username, email, password) {
	let errorMessage = '';

	while(true) {
		console.clear();

		if(errorMessage) console.log(chalk.red(errorMessage) + '\n');
		
		const gotCode = await confirm({
			message: chalk.cyan('Have you received the email with the code?')
		});

		console.log(); // empty console.log()'s are for UI purposes

		if(gotCode === false) {
			const resendCode = await confirm({
				message: chalk.cyan('Would you like the code to be resent?')
			});

			if(resendCode === true) {
				signUpUser(username, email, password);
			} else {
				mainMenuUI();
				break;
			}
		} else {
			const verificationCodeInput = await input({
				message: chalk.cyan('Please input the code you received in the email: ')
			});

			const result = await verifyCode(verificationCodeInput);

			if(result === 0) { // Redirect to login page or something
				console.log('Successfully created account!');
				return 0;
			} else if(result === 1) {
				errorMessage = 'Code does not match!';
			}
		}
	}

}

async function verifyCode(code) {
	try {
		const response = await axios.post('http://localhost:3000/api/verify-code', { code });

		return 0;
	} catch(err) {
		return err.response.data.code;
	}
}

async function signUpUser(username, email, password) {
	try {
		const response = await axios.post('http://localhost:3000/api/signup', {
			username, email, password
		});

		return 0;
	} catch(err) {
		return err.response.data.code;
	}
}

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
		} else {
			console.log(chalk.cyan('\nLogging in...Please wait patiently'));
		}
	}
}

mainMenuUI();

//hide();

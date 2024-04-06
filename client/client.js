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
			const result = signUpUser();
			break;
			//	TODO: Verify availability of username and email
		}
	}

	while(true) {
		console.clear();
		const gotCode = await confirm({
			message: 'Please check your email for a verification code. ' + chalk.cyan('Have you received the code yet?\n')
		});

		if(gotCode === false) {
			const resendCode = await confirm({
				message: chalk.cyan('\nWould you like the code to be resent?')
			});

			if(resendCode === true) {
				signUpUser();
			} else {
				mainMenuUI();
				break;
			}
		} else {
			const verificationCodeInput = await input({
				message: chalk.cyan('Please input the code you received in the email: ')
			});

			// TODO: Check the code by sending request to /api/verifyCode
		}
	}
}

async function signUpUser(username, email, password) {
	try {
		;
	} catch(err) {
		;
	}
	 // TODO: Send request to /api/signup
}

mainMenuUI();

//hide();

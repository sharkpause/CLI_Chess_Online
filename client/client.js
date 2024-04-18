#! /usr/bin/env node

import chalk from 'chalk';
import axios from 'axios';

import { show, hide } from 'alternate-screen';
import { select, input, password, Separator } from '@inquirer/prompts';

import signUpUI from './pages/signup.js';

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

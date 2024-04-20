#! /usr/bin/env node

import chalk from 'chalk';
import axios from 'axios';

import { show, hide } from 'alternate-screen';
import { select, input, password, Separator } from '@inquirer/prompts';

import signUpUI from './pages/signup.js';
import loginUI from './pages/login.js'

try {
	await axios.get(API_URL + '/ping');
} catch(err) {
	console.log(chalk.red('Server not up yet, please try again later'));
	process.exit(0);
}

show();

async function mainMenuUI() {
	while(true) {
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

		if(mainMenuAnswer === 'signup') {
			await signUpUI();
		} else if(mainMenuAnswer === 'login') {
			await loginUI();
		} else if(mainMenuAnswer === 'quit') {
			return;
		}
	}
}

mainMenuUI();

//hide();

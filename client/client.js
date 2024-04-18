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

mainMenuUI();

//hide();

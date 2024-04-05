#! /usr/bin/env node

const { show, hide } = require('alternate-screen');
const { select, Separator } = require('@inquirer/prompts');

async function ui() {
	show();
	console.clear();

	const answer = await select({
		message: 'Welcome to CLI Chess Online!\n',
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

	hide();
}

ui();

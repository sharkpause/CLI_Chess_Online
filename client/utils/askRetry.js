import { confirm } from '@inquirer/prompts';

export default async function askRetry() {
	const answer = await confirm({
		message: 'Would you like to retry?'
	});

	return answer;
}

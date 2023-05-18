import simpleGit, { SimpleGit, DiffResult } from 'simple-git';
import * as fs from 'fs-extra';

async function gitDiff(repositoryUrl: string, tag1: string, tag2: string): Promise<void> {
	const git: SimpleGit = simpleGit();

	const tempDir = './temp-repo';

	// Delete the temporary directory if it exists
	if (fs.existsSync(tempDir)) {
		console.log('tempDir exists, removing it');
		await fs.remove(tempDir);
	}

	// Create a new empty temporary directory
	console.log('creating tempDir');
	await fs.mkdir(tempDir);

	// Clone the repository from the provided URL
	await git.clone(repositoryUrl, './temp-repo');

	// Change the working directory to the cloned repository
	git.cwd('./temp-repo');

	// Perform the 'git diff' operation
	let diff: string = '';
	try {
		diff = await git.diff([`${tag1}..${tag2}`]);
		console.log('diff', diff);

		// Rest of the code...
	} catch (error) {
		console.error('An error occurred while performing git diff:', error);
	}

	// Remove the temporary repository
	console.log(diff);
	await fs.remove(tempDir);
}

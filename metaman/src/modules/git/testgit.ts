import { gitDiff } from './git';
// Define the gitDiff function and imports here...

export async function testGitDiff() {
	const repositoryUrl = 'https://github.com/JeffDanowski/test-repo';
	const tag1 = 'v1.0.0';
	const tag2 = 'v2.0.0';

	try {
		const diffSummary = await gitDiff(repositoryUrl, tag1, tag2);
		//console.log(diffSummary);
	} catch (error) {
		console.error('An error occurred:', error);
	}
}

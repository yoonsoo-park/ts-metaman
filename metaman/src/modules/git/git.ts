import simpleGit, { SimpleGit, DiffResult } from 'simple-git';
import * as fs from 'fs-extra';

export async function gitDiff(
	repositoryUrl: string,
	tag1: string,
	tag2: string
): Promise<GitDiffResult> {
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
	console.log('removing tempDir');
	await fs.remove(tempDir);

	const fileChanges: GitDiffResult = parseGitDiff(diff);
	if (fileChanges.repository === '') {
		fileChanges.repository = repositoryUrl;
	}
	if (fileChanges.tags.length === 0) {
		fileChanges.tags.push(tag1);
		fileChanges.tags.push(tag2);
	}

	console.log('fileChanges', fileChanges);
	return fileChanges;
}
interface FileChange {
	fileName: string;
	changeType: 'added' | 'modified' | 'deleted';
}

interface GitDiffResult {
	repository: string;
	tags: string[];
	new: string[];
	changed: string[];
	removed: string[];
}

function parseGitDiff(diffOutput: string): GitDiffResult {
	const result: GitDiffResult = {
		repository: '',
		tags: [],
		new: [],
		changed: [],
		removed: [],
	};

	const lines = diffOutput.split('\n');
	let currentFile: string | null = null;
	let isAddedFileMode = false;
	let isDeletedFileMode = false;

	for (const line of lines) {
		if (line.startsWith('+++')) {
			// Extract the file name
			const filePathMatch = line.match(/\+\+\+ b\/(.+)/);
			if (filePathMatch && filePathMatch.length > 1) {
				currentFile = filePathMatch[1];
			}
		} else if (line.startsWith('@@')) {
			// Ignore the line range information
			continue;
		} else if ((line.startsWith('+') || line.startsWith('-')) && currentFile) {
			if (isAddedFileMode) {
				if (!result.new.includes(currentFile)) {
					result.new.push(currentFile);
				}
			} else if (isDeletedFileMode) {
				if (!result.removed.includes(currentFile)) {
					result.removed.push(currentFile);
				}
				result.removed.push(currentFile);
			} else {
				// Line change (added, modified, or deleted)
				if (!result.changed.includes(currentFile)) {
					result.changed.push(currentFile);
				}
			}
		} else if (line.startsWith('deleted file mode')) {
			// Set the deleted file mode flag
			isDeletedFileMode = true;
		} else if (line.startsWith('diff --git')) {
			// Reset the current file and flags
			currentFile = null;
			isAddedFileMode = false;
			isDeletedFileMode = false;
		} else if (line.startsWith('new file mode')) {
			// Set the added file mode flag
			isAddedFileMode = true;
		}
	}

	return result;
}

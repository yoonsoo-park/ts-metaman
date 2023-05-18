import * as fs from 'fs';
import * as path from 'path';
import { diffLines } from 'diff';

/*
const folder1 = '/path/to/folder1';
const folder2 = '/path/to/folder2';

const comparer = new FolderComparer(folder1, folder2);
const comparisonTree = comparer.compareFolders();
const differences = comparer.getDifferences();

console.log(JSON.stringify(comparisonTree, null, 2));
console.log(JSON.stringify(differences, null, 2));
*/

class DifferenceCollector {
	private differences: FileDiff[];

	constructor() {
		this.differences = [];
	}

	collectDifference(fileDiff: FileDiff) {
		this.differences.push(fileDiff);
	}

	getDifferences(): FileDiff[] {
		return this.differences;
	}
}

class TreeNode {
	name: string;
	type: 'folder' | 'file';
	children: TreeNode[];
	path: string;

	constructor(name: string, type: 'folder' | 'file', path: string) {
		this.name = name;
		this.type = type;
		this.path = path;
		this.children = [];
	}

	addChild(child: TreeNode) {
		this.children.push(child);
	}
}

class FileDiff {
	name: string;
	path: string;
	changeType: 'added' | 'modified' | 'deleted';
	addedLines: string[];
	modifiedLines: string[];
	deletedLines: string[];

	constructor(name: string, path: string, changeType: 'added' | 'modified' | 'deleted') {
		this.name = name;
		this.path = path;
		this.changeType = changeType;
		this.addedLines = [];
		this.modifiedLines = [];
		this.deletedLines = [];
	}
}

/**
 *
 */
class FolderComparer {
	private folder1: string;
	private folder2: string;
	private differenceCollector: DifferenceCollector;

	constructor(folder1: string, folder2: string) {
		this.folder1 = folder1;
		this.folder2 = folder2;
		this.differenceCollector = new DifferenceCollector();
	}

	compareFolders(): TreeNode {
		const folder1Tree = this.buildDirectoryTree(this.folder1);
		const folder2Tree = this.buildDirectoryTree(this.folder2);
		const root = new TreeNode('Comparison', 'folder', '');

		this.compareDirectoryTrees(root, folder1Tree, folder2Tree);

		return root;
	}

	private buildDirectoryTree(folder: string, parentPath = ''): TreeNode {
		const folderName = path.basename(folder);
		const folderPath = path.join(parentPath, folderName);
		const rootNode = new TreeNode(folderName, 'folder', folderPath);

		const files = fs.readdirSync(folder);
		for (const file of files) {
			const filePath = path.join(folder, file);
			const stats = fs.statSync(filePath);

			if (stats.isDirectory()) {
				const childNode = this.buildDirectoryTree(filePath, folderPath);
				rootNode.addChild(childNode);
			} else {
				const childNode = new TreeNode(file, 'file', path.join(folderPath, file));
				rootNode.addChild(childNode);
			}
		}

		return rootNode;
	}

	private compareDirectoryTrees(parentNode: TreeNode, tree1: TreeNode, tree2: TreeNode) {
		this.compareNodes(parentNode, tree1, tree2);
		this.compareNodes(parentNode, tree2, tree1);
	}

	private compareNodes(parentNode: TreeNode, node1: TreeNode, node2: TreeNode) {
		for (const child1 of node1.children) {
			const correspondingChild = this.findCorrespondingChild(child1, node2);
			if (correspondingChild) {
				if (child1.type === 'file' && correspondingChild.type === 'file') {
					const fileDiff = this.compareFiles(child1, correspondingChild);
					if (fileDiff) {
						this.differenceCollector.collectDifference(fileDiff);
					}
				} else if (child1.type === 'folder' && correspondingChild.type === 'folder') {
					const folderNode = new TreeNode(child1.name, 'folder', child1.path);
					this.compareDirectoryTrees(folderNode, child1, correspondingChild);
					parentNode.addChild(folderNode);
				}
			} else {
				// child1 is not present in node2, add it to the differenceCollector as needed
				const fileRemovalDiff = new FileDiff(child1.name, child1.path, 'deleted');
				this.differenceCollector.collectDifference(fileRemovalDiff);
			}
		}

		for (const child2 of node2.children) {
			const correspondingChild = this.findCorrespondingChild(child2, node1);
			if (!correspondingChild) {
				// child2 is not present in node1, add it to the differenceCollector as needed
				const fileAdditionDiff = new FileDiff(child2.name, child2.path, 'added');
				this.differenceCollector.collectDifference(fileAdditionDiff);
			}
		}
	}

	private findCorrespondingChild(node: TreeNode, parentNode: TreeNode): TreeNode | undefined {
		return parentNode.children.find(
			(child) => child.name === node.name && child.type === node.type
		);
	}

	private compareFiles(file1: TreeNode, file2: TreeNode): FileDiff | undefined {
		const filePath1 = path.join(this.folder1, file1.name);
		const filePath2 = path.join(this.folder2, file2.name);
		const content1 = fs.readFileSync(filePath1, 'utf-8');
		const content2 = fs.readFileSync(filePath2, 'utf-8');
		const differences = diffLines(content1, content2);
		const diffLinesAdded: string[] = [];
		const diffLinesModified: string[] = [];
		const diffLinesDeleted: string[] = [];

		for (const diff of differences) {
			if (diff.added) {
				diffLinesAdded.push(diff.value);
			} else if (diff.removed) {
				diffLinesDeleted.push(diff.value);
			} else {
				diffLinesModified.push(diff.value);
			}
		}

		if (
			diffLinesAdded.length > 0 ||
			diffLinesModified.length > 0 ||
			diffLinesDeleted.length > 0
		) {
			const fileDiff = new FileDiff(file1.name, file1.path, 'modified');
			fileDiff.addedLines = diffLinesAdded;
			fileDiff.modifiedLines = diffLinesModified;
			fileDiff.deletedLines = diffLinesDeleted;

			return fileDiff;
		}

		return undefined;
	}

	getDifferences(): FileDiff[] {
		return this.differenceCollector.getDifferences();
	}
}

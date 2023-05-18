import { Command, Flags, Args } from '@oclif/core';
import { testGitDiff } from '../../modules/git/testgit';

export default class Metaman extends Command {
	static description = 'yopa ts metaman';

	static examples = ['$ ts-metaman permission-diff -p "v1.0.0" -n "v2.0.0" -p -o "output.csv"'];

	static flags = {
		print: Flags.boolean({
			char: 'p', // short character for flag
			default: false, // default value if flag not passed (can be a function that returns a boolean)
			env: 'MY_NAME', // default value to the value of an environment variable
			// boolean flags may be reversed with `--no-` (in this case: `--no-force`).
			// The flag will be set to false if reversed. This functionality
			// is disabled by default, to enable it:
			// allowNo: true
		}),
		output: Flags.string({
			char: 'o',
			description: 'Create a file that contains the result',
			required: false,
			//default: 'undefined',
		}),
	};

	static args = {
		metamanAction: Args.string({
			name: 'Action', // name of arg to show in help and reference with args[name]
			required: true, // make the arg required with `required: true`
			description: ': obviously we MUST provide metaman action! duh...', // help description
			options: ['permission-list', 'permission-diff', 'data-model-diff', 'metaman-api'], // only allow input to be from a discrete set
		}),
	};

	public async run(): Promise<void> {
		const { flags, args } = await this.parse(Metaman);

		console.log('flags', flags);
		console.log('args', args);

		if (args.metamanAction === 'permission-diff') {
			console.log('permission-diff');
			testGitDiff();
		}

		// const authKey = flags.authKey;
		// const configFilePaths = flags.configFilePath.split(',') as string[];

		// const provisionLauncher = new FeatureLauncher(new Provisioner(authKey, configFilePaths));
		// provisionLauncher.launch();
	}
}

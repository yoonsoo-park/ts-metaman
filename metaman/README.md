oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ts-metaman
$ ts-metaman COMMAND
running command...
$ ts-metaman (--version)
ts-metaman/0.0.0 darwin-x64 node-v18.14.2
$ ts-metaman --help [COMMAND]
USAGE
  $ ts-metaman COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ts-metaman hello PERSON`](#ts-metaman-hello-person)
* [`ts-metaman hello world`](#ts-metaman-hello-world)
* [`ts-metaman help [COMMANDS]`](#ts-metaman-help-commands)
* [`ts-metaman permission-list VERSION`](#ts-metaman-permission-list-version)
* [`ts-metaman plugins`](#ts-metaman-plugins)
* [`ts-metaman plugins:install PLUGIN...`](#ts-metaman-pluginsinstall-plugin)
* [`ts-metaman plugins:inspect PLUGIN...`](#ts-metaman-pluginsinspect-plugin)
* [`ts-metaman plugins:install PLUGIN...`](#ts-metaman-pluginsinstall-plugin-1)
* [`ts-metaman plugins:link PLUGIN`](#ts-metaman-pluginslink-plugin)
* [`ts-metaman plugins:uninstall PLUGIN...`](#ts-metaman-pluginsuninstall-plugin)
* [`ts-metaman plugins:uninstall PLUGIN...`](#ts-metaman-pluginsuninstall-plugin-1)
* [`ts-metaman plugins:uninstall PLUGIN...`](#ts-metaman-pluginsuninstall-plugin-2)
* [`ts-metaman plugins update`](#ts-metaman-plugins-update)

## `ts-metaman hello PERSON`

Say hello

```
USAGE
  $ ts-metaman hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/yoonsoo-park/ts-metaman/blob/v0.0.0/dist/commands/hello/index.ts)_

## `ts-metaman hello world`

Say hello world

```
USAGE
  $ ts-metaman hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ ts-metaman hello world
  hello world! (./src/commands/hello/world.ts)
```

## `ts-metaman help [COMMANDS]`

Display help for ts-metaman.

```
USAGE
  $ ts-metaman help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ts-metaman.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `ts-metaman permission-list VERSION`

Compare permissions between two versions

```
USAGE
  $ ts-metaman permission-list VERSION -p <value> -o <value>

ARGUMENTS
  VERSION  (a|b) [default: world] output file

FLAGS
  -o, --output=<value>  (required) Create a file that contains the result
  -p, --print=<value>   (required) Print the result to the console

DESCRIPTION
  Compare permissions between two versions
```

_See code: [dist/commands/permission-list.ts](https://github.com/yoonsoo-park/ts-metaman/blob/v0.0.0/dist/commands/permission-list.ts)_

## `ts-metaman plugins`

List installed plugins.

```
USAGE
  $ ts-metaman plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ ts-metaman plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `ts-metaman plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ ts-metaman plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ ts-metaman plugins add

EXAMPLES
  $ ts-metaman plugins:install myplugin 

  $ ts-metaman plugins:install https://github.com/someuser/someplugin

  $ ts-metaman plugins:install someuser/someplugin
```

## `ts-metaman plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ ts-metaman plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ ts-metaman plugins:inspect myplugin
```

## `ts-metaman plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ ts-metaman plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ ts-metaman plugins add

EXAMPLES
  $ ts-metaman plugins:install myplugin 

  $ ts-metaman plugins:install https://github.com/someuser/someplugin

  $ ts-metaman plugins:install someuser/someplugin
```

## `ts-metaman plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ ts-metaman plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ ts-metaman plugins:link myplugin
```

## `ts-metaman plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ts-metaman plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ts-metaman plugins unlink
  $ ts-metaman plugins remove
```

## `ts-metaman plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ts-metaman plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ts-metaman plugins unlink
  $ ts-metaman plugins remove
```

## `ts-metaman plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ts-metaman plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ts-metaman plugins unlink
  $ ts-metaman plugins remove
```

## `ts-metaman plugins update`

Update installed plugins.

```
USAGE
  $ ts-metaman plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->

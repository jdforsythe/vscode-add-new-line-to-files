# Add New Line to Files Visual Studio Code Extension

This extension ensures that all files end in a new line when you save them

## Features

When you save any file, this will add a new line to the end of the file, if there isn't one present. You can set the preferred
line ending in the config option `editor.lineEnding` in your User Settings or Workspace Settings. Default is `\n`.

## Extension Settings

This extension contributes the following settings:

* `editor.lineEnding`: (string) - default `"\n"` - the line ending to use when adding to the end of your files

## Known Issues

There is currently no way to whitelist or blacklist file types. This is planned for a future release.
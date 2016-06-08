'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  workspace, Disposable, ExtensionContext, TextDocument, WorkspaceEdit, Position, WorkspaceConfiguration
} from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('add-new-line-to-files is now active!');

  // create a new NewLineHandler
  let newLineHandler = new NewLineHandler();
  let controller = new EventController(newLineHandler);

  // add to a list of disposables which are disposed when the extension is deactivated
  context.subscriptions.push(controller);
  context.subscriptions.push(newLineHandler);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

class NewLineHandler {
  public addNewLine(document: TextDocument) {
    // get the line count
    let lineCount = document.lineCount;
    console.log('lineCount: ' + lineCount);

    let allText = document.getText();
    let matches = allText.match(/\r?\n$/);
    if (matches) {
      return;
    }

    let workspaceConfiguration = workspace.getConfiguration('editor');
    let lineEnding: string = workspaceConfiguration.get<string>('lineEnding');

    let uri = document.uri;

    let workspaceEdit = new WorkspaceEdit();
    let position = new Position(lineCount, 0);
    workspaceEdit.insert(uri, position, lineEnding);
    workspace.applyEdit(workspaceEdit).then(function() {
      document.save();
    });
  }

  dispose() {}
}

class EventController {
  private _disposable: Disposable;
  private _newLineHandler: NewLineHandler;

  constructor(newLineHandler: NewLineHandler) {
    this._newLineHandler = newLineHandler;

    // subscribe to events
    let subscriptions: Disposable[] = [];
    workspace.onDidSaveTextDocument(this._onEvent, this, subscriptions);

    this._disposable = Disposable.from(...subscriptions);
  }

  dispose() {
    this._disposable.dispose();
  }

  private _onEvent(document: TextDocument) {
    this._newLineHandler.addNewLine(document);
  }
}

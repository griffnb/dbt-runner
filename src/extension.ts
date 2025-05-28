// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // To read settings for your extension
  const config = vscode.workspace.getConfiguration("dbt-runner");

  const exactCommand = vscode.commands.registerCommand(
    "dbt-runner.run_exact",
    (path) => {
      // Example: Getting a string setting
      const dbtPath = config.get("command_path", "make run-select TABLE=");
      const removeExtension = config.get("remove_extension", true);
      let finalFile = getFile(path, removeExtension);

      const fullCommand = `${dbtPath}${finalFile}`;

      // Create a terminal
      const terminal = vscode.window.createTerminal("DBT Runner");

      // Show the terminal
      terminal.show();
      // Execute the command
      terminal.sendText(fullCommand);
      vscode.window.showInformationMessage(`Running: ${fullCommand}`);
    }
  );

  const prependCommand = vscode.commands.registerCommand(
    "dbt-runner.run_prepend",
    (path) => {
      // Example: Getting a string setting
      const dbtPath = config.get("command_path", "make run-select TABLE=");
      const removeExtension = config.get("remove_extension", true);
      let finalFile = getFile(path, removeExtension);

      const fullCommand = `${dbtPath}+${finalFile}`;

      // Create a terminal
      const terminal = vscode.window.createTerminal("DBT Runner");

      // Show the terminal
      terminal.show();
      // Execute the command
      terminal.sendText(fullCommand);
      vscode.window.showInformationMessage(`Running: ${fullCommand}`);
    }
  );

  const allCommand = vscode.commands.registerCommand(
    "dbt-runner.run_all",
    (path) => {
      // Example: Getting a string setting
      const dbtPath = config.get("command_path", "make run-select TABLE=");
      const removeExtension = config.get("remove_extension", true);
      let finalFile = getFile(path, removeExtension);

      const fullCommand = `${dbtPath}+${finalFile}+`;

      // Create a terminal
      const terminal = vscode.window.createTerminal("DBT Runner");

      // Show the terminal
      terminal.show();
      // Execute the command
      terminal.sendText(fullCommand);
      vscode.window.showInformationMessage(`Running: ${fullCommand}`);
    }
  );

  const afterCommand = vscode.commands.registerCommand(
    "dbt-runner.run_after",
    (path) => {
      // Example: Getting a string setting
      const dbtPath = config.get("command_path", "make run-select TABLE=");
      const removeExtension = config.get("remove_extension", true);
      let finalFile = getFile(path, removeExtension);

      const fullCommand = `${dbtPath}${finalFile}+`;

      // Create a terminal
      const terminal = vscode.window.createTerminal("DBT Runner");

      // Show the terminal
      terminal.show();
      // Execute the command
      terminal.sendText(fullCommand);
      vscode.window.showInformationMessage(`Running: ${fullCommand}`);
    }
  );

  context.subscriptions.push(exactCommand);
  context.subscriptions.push(prependCommand);
  context.subscriptions.push(allCommand);
  context.subscriptions.push(afterCommand);
}

function getFile(path: vscode.Uri, removeExtension: boolean): string {
  // Create a command with the file path

  const fileName = path.fsPath.split("/").pop();

  let finalFile = fileName;
  if (removeExtension) {
    finalFile = fileName ? fileName.replace(/\.[^/.]+$/, "") : "";
  }

  return finalFile || "";
}

// This method is called when your extension is deactivated
export function deactivate() {}

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
      runCommand(config, path, false, (file) => file);
    }
  );

  const prependCommand = vscode.commands.registerCommand(
    "dbt-runner.run_prepend",
    (path) => {
      runCommand(config, path, false, (file) => `+${file}`);
    }
  );

  const allCommand = vscode.commands.registerCommand(
    "dbt-runner.run_all",
    (path) => {
      runCommand(config, path, false, (file) => `+${file}+`);
    }
  );

  const afterCommand = vscode.commands.registerCommand(
    "dbt-runner.run_after",
    (path) => {
      runCommand(config, path, false, (file) => `${file}+`);
    }
  );

  const exactRefreshCommand = vscode.commands.registerCommand(
    "dbt-runner.run_exact_refresh",
    (path) => {
      runCommand(config, path, true, (file) => file);
    }
  );

  const prependRefreshCommand = vscode.commands.registerCommand(
    "dbt-runner.run_prepend_refresh",
    (path) => {
      runCommand(config, path, true, (file) => `+${file}`);
    }
  );

  const allRefreshCommand = vscode.commands.registerCommand(
    "dbt-runner.run_all_refresh",
    (path) => {
      runCommand(config, path, true, (file) => `+${file}+`);
    }
  );

  const afterRefreshCommand = vscode.commands.registerCommand(
    "dbt-runner.run_after_refresh",
    (path) => {
      runCommand(config, path, true, (file) => `${file}+`);
    }
  );

  context.subscriptions.push(exactCommand);
  context.subscriptions.push(prependCommand);
  context.subscriptions.push(allCommand);
  context.subscriptions.push(afterCommand);
  context.subscriptions.push(exactRefreshCommand);
  context.subscriptions.push(prependRefreshCommand);
  context.subscriptions.push(allRefreshCommand);
  context.subscriptions.push(afterRefreshCommand);
}

function runCommand(
  config: vscode.WorkspaceConfiguration,
  path: vscode.Uri,
  fullRefresh: boolean,
  fileWrap: (file: string) => string
) {
  // Example: Getting a string setting
  const dbtPath = fullRefresh
    ? config.get("refresh_command_path", "make run-select-refresh TABLE=")
    : config.get("command_path", "make run-select TABLE=");
  const removeExtension = config.get("remove_extension", true);
  let finalFile = getFile(path, removeExtension);

  const fullCommand = `${dbtPath}${fileWrap(finalFile)}`;

  // Create a terminal
  const terminal = vscode.window.createTerminal("DBT Runner");

  // Show the terminal
  terminal.show();
  // Execute the command
  terminal.sendText(fullCommand);
  vscode.window.showInformationMessage(`Running: ${fullCommand}`);
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

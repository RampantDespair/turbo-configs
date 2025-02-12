import { execSync } from "child_process";
import { readFileSync } from "fs";
import { join } from "path";

// Read package.json and parse workspaces
const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));
const workspaces = packageJson.workspaces;

// Function to execute command and handle errors
function executeCommand(command: string, cwd: string) {
  try {
    execSync(command, {
      cwd,
      stdio: "inherit", // This will show output in real-time
    });
    return true;
  } catch (error) {
    console.error(
      `Error executing command in ${cwd}:`,
      (error as Error).message,
    );
    return false;
  }
}

// Main function to update dependencies
async function updateWorkspaces() {
  console.log("Starting workspace updates...\n");

  // First update root dependencies
  console.log("Updating root dependencies...");
  executeCommand("npx npm-check-updates -u", "./");
  executeCommand("npm install", "./");

  // Then update each workspace
  for (const workspace of workspaces) {
    console.log(`\nProcessing workspace: ${workspace}`);
    const workspacePath = join("./", workspace);

    console.log("Running npm-check-updates...");
    const ncuSuccess = executeCommand(
      "npx npm-check-updates -u",
      workspacePath,
    );

    if (ncuSuccess) {
      console.log("Running npm install...");
      executeCommand("npm install", workspacePath);
    }
  }

  console.log("\nAll workspaces have been processed.");
}

// Run the update
updateWorkspaces().catch((error) => {
  console.error("Failed to update workspaces:", error);
  process.exit(1);
});

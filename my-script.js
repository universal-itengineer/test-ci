// Script file imported by actions/github-script example
const fs = require('fs');
const path = require('path');

module.exports = async ({ github, context, core }) => {
  // process.cwd() returns the workflow working directory (where checkout happened)
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  core.info(`Package name: ${packageJson.name}`);
  core.info(`Package version: ${packageJson.version}`);
  core.setOutput('package-name', packageJson.name);
};

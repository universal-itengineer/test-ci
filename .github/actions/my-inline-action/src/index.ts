import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
  try {
    const name = core.getInput('name', { required: true });
    const token = core.getInput('token');

    core.info(`Hello, ${name}!`);
    core.info(`Repository: ${github.context.repo.owner}/${github.context.repo.repo}`);

    if (token) {
      const octokit = github.getOctokit(token);
      const { data } = await octokit.rest.repos.get({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
      });
      core.info(`Default branch: ${data.default_branch}`);
      core.setOutput('default-branch', data.default_branch);
    }

    core.setOutput('greeting', `Hello, ${name}!`);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();

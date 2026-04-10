import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
  try {
    const name = core.getInput('name', { required: true });
    const uppercase = core.getInput('uppercase') === 'true';

    let greeting = `Hello, ${name}!`;

    if (uppercase) {
      greeting = greeting.toUpperCase();
    }

    core.info(greeting);
    core.info(`Repository: ${github.context.repo.owner}/${github.context.repo.repo}`);
    core.info(`Actor: ${github.context.actor}`);

    core.setOutput('greeting', greeting);
    core.setOutput('greeting-length', greeting.length.toString());
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();

import { Worker } from '@temporalio/worker';
import * as activities from './activities';
import { rpaWorkflow, archiveSessionWorkflow } from './workflows';

async function run() {
  // Create a worker that connects to the Temporal Cluster
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'rpa-playwright-queue',
  });

  console.log('Worker started. Listening for tasks...');
  
  // Start the worker
  await worker.run();
}

run().catch((err) => {
  console.error('Worker failed to start:', err);
  process.exit(1);
});
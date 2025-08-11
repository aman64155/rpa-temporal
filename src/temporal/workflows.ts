import { proxyActivities, defineQuery, defineSignal, setHandler, getExternalWorkflowHandle } from '@temporalio/workflow';
import type { Step, HistoryItem } from './activities';

const { executePlaywrightStep } = proxyActivities({
  startToCloseTimeout: '30 seconds',
  retry: {
    maximumAttempts: 3,
  },
});

const { sendDataToExternalApi } = proxyActivities({
  startToCloseTimeout: '30 seconds',
});

// Define signals and queries
export const recordStepSignal = defineSignal<[Step]>('recordStep');
export const getStatusQuery = defineQuery<{
  status: string;
  completedSteps: number;
  pendingSteps: number;
  latestSteps: HistoryItem[];
  error?: string;
}>('getStatus');

export async function rpaWorkflow(sessionId: string): Promise<void> {
  // State variables
  const stepQueue: Step[] = [];
  const history: HistoryItem[] = [];
  const latestSteps: HistoryItem[] = [];
  let status = 'running';
  let error: string | undefined;

  // Set up signal handler for receiving new steps
  setHandler(recordStepSignal, (step: Step) => {
    stepQueue.push(step);
  });

  // Set up query handler for getting status
  setHandler(getStatusQuery, () => ({
    status,
    completedSteps: history.length,
    pendingSteps: stepQueue.length,
    latestSteps: [...latestSteps],
    error,
  }));

  // Main workflow loop
  while (status === 'running') {
    // Wait for steps to be available
    if (stepQueue.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      continue;
    }

    // Take the next step from the queue
    const step = stepQueue.shift()!;
    const timestamp = new Date();

    try {
      // Execute the step with retry policy
      const result = await executePlaywrightStep(step);
      
      // Update history and latest steps on success
      const historyItem: HistoryItem = {
        step,
        timestamp,
        success: true,
      };
      
      history.push(historyItem);
      latestSteps.push(historyItem);
      
      // Keep only the last 10 steps in latestSteps
      if (latestSteps.length > 10) {
        latestSteps.shift();
      }
      
      console.log(`Step completed successfully: ${result}`);
      
    } catch (err) {
      // Handle step failure
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Step failed after all retries: ${errorMessage}`);
      
      const historyItem: HistoryItem = {
        step,
        timestamp,
        success: false,
        error: errorMessage,
      };
      
      history.push(historyItem);
      status = 'failed';
      error = errorMessage;
      break;
    }
  }

  console.log(`RPA workflow completed with status: ${status}`);
}

export async function archiveSessionWorkflow(sessionId: string): Promise<void> {
  console.log(`Starting archive workflow for session: ${sessionId}`);
  
  try {
    // For now, we'll simulate getting the data from the original workflow
    // In a real implementation, you might use Temporal's data converter or
    // store the data in a database that both workflows can access
    
    // Simulate successful steps data
    const successfulSteps: HistoryItem[] = [
      {
        step: { action: 'click', target: '#button' },
        timestamp: new Date(),
        success: true,
      },
      {
        step: { action: 'type', target: '#input', value: 'test' },
        timestamp: new Date(),
        success: true,
      }
    ];
    
    if (successfulSteps.length > 0) {
      // Send the data to external API
      const result = await sendDataToExternalApi(sessionId, successfulSteps);
      console.log(`Archived ${result.itemsSent} items for session: ${sessionId}`);
    } else {
      console.log(`No successful steps to archive for session: ${sessionId}`);
    }
    
  } catch (err) {
    console.error(`Failed to archive session ${sessionId}:`, err);
    throw err;
  }
}

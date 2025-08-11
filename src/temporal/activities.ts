export interface Step {
  action: string;
  target: string;
  [key: string]: any;
}

export interface HistoryItem {
  step: Step;
  timestamp: Date;
  success: boolean;
  error?: string;
}

export async function executePlaywrightStep(step: Step): Promise<string> {
  console.log(`Executing Playwright step: ${step.action} on ${step.target}`);
  
  // Simulate a 2-second delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate potential failure if action is "fail"
  if (step.action === "fail") {
    throw new Error(`Simulated failure for step: ${step.action} on ${step.target}`);
  }
  
  return `Successfully executed ${step.action} on ${step.target}`;
}

export async function sendDataToExternalApi(sessionId: string, history: HistoryItem[]): Promise<{ itemsSent: number }> {
  console.log(`Sending data to external API for session: ${sessionId}`);
  console.log(`Data to send:`, history);
  
  // Simulate a 1-second network call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { itemsSent: history.length };
}
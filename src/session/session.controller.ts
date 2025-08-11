import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { TemporalService } from '../temporal/temporal.service';
import { rpaWorkflow, archiveSessionWorkflow, recordStepSignal, getStatusQuery } from '../temporal/workflows';
import { v4 as uuidv4 } from 'uuid';
import { Step } from '../temporal/activities';

@Controller('api/sessions')
export class SessionController {
  constructor(private readonly temporalService: TemporalService) {}

  @Post()
  async createSession() {
    const sessionId = uuidv4();
    const client = this.temporalService.getClient();
    
    // Start the RPA workflow
    const handle = await client.workflow.start(rpaWorkflow, {
      taskQueue: 'rpa-playwright-queue',
      workflowId: sessionId,
      args: [sessionId],
    });

    console.log(`Started RPA workflow with session ID: ${sessionId}`);
    
    return {
      sessionId,
      workflowId: handle.workflowId,
      message: 'RPA session created successfully',
    };
  }

  @Post(':sessionId/events')
  async recordStep(@Param('sessionId') sessionId: string, @Body() step: Step) {
    const client = this.temporalService.getClient();
    
    // Get a handle to the existing workflow
    const handle = client.workflow.getHandle(sessionId);
    
    // Send the step as a signal
    await handle.signal(recordStepSignal, step);
    
    console.log(`Sent step signal to session ${sessionId}:`, step);
    
    return {
      sessionId,
      message: 'Step recorded successfully',
      step,
    };
  }

  @Get(':sessionId/status')
  async getStatus(@Param('sessionId') sessionId: string) {
    const client = this.temporalService.getClient();
    
    // Get a handle to the existing workflow
    const handle = client.workflow.getHandle(sessionId);
    
    // Query the workflow status
    const status = await handle.query(getStatusQuery);
    
    return {
      sessionId,
      ...status,
    };
  }

  @Post(':sessionId/archive')
  async archiveSession(@Param('sessionId') sessionId: string) {
    const client = this.temporalService.getClient();
    
    // Start the archive workflow
    const handle = await client.workflow.start(archiveSessionWorkflow, {
      taskQueue: 'rpa-playwright-queue',
      workflowId: `archive-${sessionId}`,
      args: [sessionId],
    });

    console.log(`Started archive workflow for session: ${sessionId}`);
    
    return {
      sessionId,
      archiveWorkflowId: handle.workflowId,
      message: 'Archive workflow started successfully',
    };
  }
}

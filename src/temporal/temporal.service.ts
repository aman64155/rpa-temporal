import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from '@temporalio/client';

@Injectable()
export class TemporalService implements OnModuleInit {
  private client: Client;

  async onModuleInit() {
    // Create a singleton instance of the Temporal Client
    this.client = new Client({
      namespace: 'default', // You can configure this based on your setup
    });
  }

  getClient(): Client {
    return this.client;
  }
}

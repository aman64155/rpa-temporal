<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# RPA Temporal Backend

A durable, stateful RPA system built with NestJS and Temporal. This architecture replaces complex custom-built systems with a unified Temporal platform for state management, queuing, and reliability.

## Architecture Overview

- **API Layer**: NestJS application acting as a Temporal Client
- **Temporal Cluster**: Stateful backend managing workflows and state
- **Fargate Workers**: Stateless containers running Temporal Workers

## Prerequisites

1. **Temporal Cluster**: You need a running Temporal cluster. For local development:
   ```bash
   # Install Temporal CLI
   curl -sSf https://temporal.download/cli.sh | sh
   
   # Start Temporal server locally
   temporal server start-dev
   ```

2. **Node.js**: Version 18 or higher

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Running the Application

### 1. Start the API Server

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The API server will be available at `http://localhost:3000`

### 2. Start the Temporal Worker

In a separate terminal:

```bash
# Development mode with auto-restart
npm run worker:dev

# Production mode
npm run worker
```

The worker connects to the Temporal cluster and listens for tasks on the `rpa-playwright-queue` task queue.

## API Endpoints

### 1. Create a New Session

**POST** `/api/sessions`

Creates a new RPA session and starts the workflow.

**Response:**
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "workflowId": "550e8400-e29b-41d4-a716-446655440000",
  "message": "RPA session created successfully"
}
```

### 2. Send a Step to the Session

**POST** `/api/sessions/{sessionId}/events`

Sends a step to be executed by the RPA workflow.

**Request Body:**
```json
{
  "action": "click",
  "target": "#button"
}
```

**Response:**
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Step recorded successfully",
  "step": {
    "action": "click",
    "target": "#button"
  }
}
```

### 3. Check Session Status

**GET** `/api/sessions/{sessionId}/status`

Returns the current status of the RPA session.

**Response:**
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "running",
  "completedSteps": 5,
  "pendingSteps": 2,
  "latestSteps": [
    {
      "step": {
        "action": "click",
        "target": "#button"
      },
      "timestamp": "2024-01-15T10:30:00.000Z",
      "success": true
    }
  ]
}
```

### 4. Archive a Session

**POST** `/api/sessions/{sessionId}/archive`

Starts the archive workflow to process completed session data.

**Response:**
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "archiveWorkflowId": "archive-550e8400-e29b-41d4-a716-446655440000",
  "message": "Archive workflow started successfully"
}
```

## Testing the System

### 1. Create a Session

```bash
curl -X POST http://localhost:3000/api/sessions
```

### 2. Send Steps

```bash
# Replace {sessionId} with the actual session ID
curl -X POST http://localhost:3000/api/sessions/{sessionId}/events \
  -H "Content-Type: application/json" \
  -d '{"action": "click", "target": "#button"}'

curl -X POST http://localhost:3000/api/sessions/{sessionId}/events \
  -H "Content-Type: application/json" \
  -d '{"action": "type", "target": "#input", "value": "hello world"}'
```

### 3. Check Status

```bash
curl http://localhost:3000/api/sessions/{sessionId}/status
```

### 4. Archive Session

```bash
curl -X POST http://localhost:3000/api/sessions/{sessionId}/archive
```

## Project Structure

```
rpa-temporal-backend/
├── src/
│   ├── app.module.ts              # Main application module
│   ├── main.ts                    # Application entry point
│   ├── session/
│   │   └── session.controller.ts  # API endpoints for session management
│   └── temporal/
│       ├── temporal.service.ts    # Temporal client service
│       ├── activities.ts          # Activity functions (actual work)
│       ├── workflows.ts           # Workflow definitions
│       └── worker.ts              # Worker entry point
└── package.json
```

## Key Features

- **Durable State**: All session state is automatically managed by Temporal
- **Automatic Retries**: Failed activities are automatically retried (3 attempts)
- **Crash Recovery**: Workflows automatically resume from where they left off
- **Real-time Status**: Query workflow state at any time
- **Scalable**: Multiple workers can process tasks in parallel

## Deployment

### Local Development

1. Start Temporal server: `temporal server start-dev`
2. Start API server: `npm run start:dev`
3. Start worker: `npm run worker:dev`

### Production (AWS Fargate)

1. Build the application: `npm run build`
2. Deploy API server to API Gateway + Lambda
3. Deploy worker containers to Fargate
4. Configure Temporal cluster (self-hosted or managed)

## Troubleshooting

- **Worker not connecting**: Ensure Temporal server is running and accessible
- **Workflows not starting**: Check that the worker is running and connected to the correct task queue
- **Activities failing**: Check the worker logs for detailed error messages

## License

UNLICENSED

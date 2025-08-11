# Quick Start Guide

## Option 1: Using Docker Compose (Recommended)

1. **Start all services:**
   ```bash
   docker-compose up -d
   ```

2. **Test the API:**
   ```bash
   ./test-api.sh
   ```

3. **View logs:**
   ```bash
   # API server logs
   docker-compose logs -f rpa-api
   
   # Worker logs
   docker-compose logs -f rpa-worker
   
   # Temporal server logs
   docker-compose logs -f temporal
   ```

4. **Stop all services:**
   ```bash
   docker-compose down
   ```

## Option 2: Local Development

### Prerequisites
- Node.js 18+
- Temporal CLI

### Setup

1. **Install Temporal CLI:**
   ```bash
   curl -sSf https://temporal.download/cli.sh | sh
   ```

2. **Start Temporal server:**
   ```bash
   temporal server start-dev
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the API server (Terminal 1):**
   ```bash
   npm run start:dev
   ```

5. **Start the worker (Terminal 2):**
   ```bash
   npm run worker:dev
   ```

6. **Test the API:**
   ```bash
   ./test-api.sh
   ```

## API Endpoints

- **Create Session:** `POST http://localhost:3000/api/sessions`
- **Send Step:** `POST http://localhost:3000/api/sessions/{sessionId}/events`
- **Get Status:** `GET http://localhost:3000/api/sessions/{sessionId}/status`
- **Archive Session:** `POST http://localhost:3000/api/sessions/{sessionId}/archive`

## Example Usage

```bash
# Create a session
SESSION_ID=$(curl -s -X POST http://localhost:3000/api/sessions | jq -r '.sessionId')

# Send a step
curl -X POST http://localhost:3000/api/sessions/$SESSION_ID/events \
  -H "Content-Type: application/json" \
  -d '{"action": "click", "target": "#button"}'

# Check status
curl http://localhost:3000/api/sessions/$SESSION_ID/status | jq '.'

# Archive session
curl -X POST http://localhost:3000/api/sessions/$SESSION_ID/archive
```

## Troubleshooting

- **Worker not connecting:** Ensure Temporal server is running on `localhost:7233`
- **API not responding:** Check that the API server is running on port 3000
- **Steps not processing:** Verify the worker is running and connected to the task queue

## Next Steps

1. Replace the simulated activities in `src/temporal/activities.ts` with real Playwright commands
2. Configure external API endpoints for data archiving
3. Set up monitoring and logging
4. Deploy to production environment
#!/bin/bash

# Test script for RPA Temporal Backend API
# Make sure the API server is running on localhost:3000

echo "🚀 Testing RPA Temporal Backend API"
echo "=================================="

# 1. Create a new session
echo -e "\n1. Creating a new session..."
SESSION_RESPONSE=$(curl -s -X POST http://localhost:3000/api/sessions)
SESSION_ID=$(echo $SESSION_RESPONSE | grep -o '"sessionId":"[^"]*"' | cut -d'"' -f4)

echo "Session created with ID: $SESSION_ID"
echo "Response: $SESSION_RESPONSE"

# 2. Send some steps to the session
echo -e "\n2. Sending steps to the session..."

echo "Sending click step..."
curl -s -X POST http://localhost:3000/api/sessions/$SESSION_ID/events \
  -H "Content-Type: application/json" \
  -d '{"action": "click", "target": "#button"}' | jq '.'

echo "Sending type step..."
curl -s -X POST http://localhost:3000/api/sessions/$SESSION_ID/events \
  -H "Content-Type: application/json" \
  -d '{"action": "type", "target": "#input", "value": "hello world"}' | jq '.'

echo "Sending navigate step..."
curl -s -X POST http://localhost:3000/api/sessions/$SESSION_ID/events \
  -H "Content-Type: application/json" \
  -d '{"action": "navigate", "target": "https://example.com"}' | jq '.'

# 3. Check session status
echo -e "\n3. Checking session status..."
sleep 2
curl -s http://localhost:3000/api/sessions/$SESSION_ID/status | jq '.'

# 4. Archive the session
echo -e "\n4. Archiving the session..."
curl -s -X POST http://localhost:3000/api/sessions/$SESSION_ID/archive | jq '.'

echo -e "\n✅ API test completed!"
echo "Session ID: $SESSION_ID"
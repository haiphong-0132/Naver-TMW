#!/bin/bash

# Load environment variables
source .env.local

# Generate a random request ID
REQUEST_ID=$(uuidgen | tr -d '-')

echo "Testing ClovaX Vision API..."
echo "Endpoint: https://clovastudio.stream.ntruss.com/v3/chat-completions/HCX-005"
echo "Request ID: $REQUEST_ID"
echo ""

curl --location --request POST 'https://clovastudio.stream.ntruss.com/v3/chat-completions/HCX-005' \
--header "Authorization: Bearer $NCP_API_KEY" \
--header "X-NCP-CLOVASTUDIO-REQUEST-ID: $REQUEST_ID" \
--header 'Content-Type: application/json' \
--data '{
    "messages": [
      {
        "role": "system",
        "content": [
          {
            "type": "text",
            "text": "You are a helpful AI assistant."
          }
        ]
      },
      {
        "role": "user",
        "content": [
          {
            "type": "image_url",
            "imageUrl": {
              "url": "https://cdn.prod.website-files.com/63bd2733c7e2f16bd005016f/63da1e6826c7fb1b9e6b3d17_Avatar.webp"
            }
          },
          {
            "type": "text",
            "text": "Please describe this image."
          }
        ]
      }
    ],
    "topP": 0.8,
    "topK": 0,
    "maxTokens": 100,
    "temperature": 0.5,
    "repetitionPenalty": 1.1,
    "stop": []
  }'

# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure API Keys

Edit `.env.local` and add your API keys:

```bash
# Get from Clova Studio - Click "View code" button in your service app
NCP_API_KEY=your_api_key_here
NCP_CLOVASTUDIO_ENDPOINT=https://clovastudio.stream.ntruss.com/v3/chat-completions/HCX-005

# Get from newsapi.org (free registration)
NEWSAPI_KEY=your_newsapi_key_here
```

### Where to get API keys:

**Naver Cloud Platform (Clova Studio):**

1. Go to [Clova Studio](https://clovastudio.ncloud.com/)
2. Sign up/login if needed
3. Select or create your service app
4. Click the **"View code"** button (코드 보기) in your app dashboard
5. You'll see example code with two values you need:
   - **API Key** (shown as `<api-key>` in the Authorization header) → Copy to `NCP_API_KEY`
   - **Endpoint URL** (the URL in the curl command) → Copy to `NCP_CLOVASTUDIO_ENDPOINT`

**Note**:
- The endpoint URL format should be: `https://clovastudio.stream.ntruss.com/v3/chat-completions/HCX-XXX` (where HCX-XXX is your model ID)
- Request ID is generated automatically by the app - you don't need to configure it

**NewsAPI:**
1. Go to https://newsapi.org/register
2. Sign up for a free account
3. Copy your API key from the dashboard

## Step 3: Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Step 4: Try the News Researcher Example

1. Click on "News Researcher" from the home page
2. Try asking questions like:
   - "What's the latest news about artificial intelligence?"
   - "Find me news about climate change from this week"
   - "What's happening in technology today?"

## Troubleshooting

**"Missing environment variables" error:**
- Make sure `.env.local` exists and has all required keys
- Restart the development server after adding environment variables

**NewsAPI errors:**
- Free NewsAPI accounts have rate limits
- Make sure your API key is valid
- Check that your queries are not too frequent

**ClovaX API errors:**
- Verify your NCP credentials are correct
- Check that your endpoint URL matches your ClovaX application
- Ensure your NCP account has sufficient credits

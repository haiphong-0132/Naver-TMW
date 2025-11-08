"use client";

import ChatInterface from "@/components/ChatInterface";
import { chatWithNewsResearcher } from "./actions";
import Link from "next/link";

export default function NewsResearcherPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Examples
            </Link>
            <h1 className="text-2xl font-bold">News Researcher</h1>
          </div>
        </div>
      </header>

      {/* Description */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h2 className="text-lg font-semibold mb-2 text-black">
            ClovaX Tool Calling with NewsAPI
          </h2>
          <p className="text-black mb-4">
            This example demonstrates how ClovaX can use tool calling (function
            calling) to search for real-time news articles. Ask about any topic,
            and the AI will automatically search for relevant news using the
            NewsAPI.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              Try asking:
            </p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• "What's the latest news about artificial intelligence?"</li>
              <li>• "Find me news about climate change from this week"</li>
              <li>• "What's happening in technology today?"</li>
              <li>• "Show me recent sports news"</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 bg-gray-50">
        <div className="h-full max-w-6xl mx-auto">
          <ChatInterface
            onSendMessage={chatWithNewsResearcher}
            initialSystemMessage="Ask me about any news topic and I'll search for relevant articles!"
          />
        </div>
      </div>
    </div>
  );
}

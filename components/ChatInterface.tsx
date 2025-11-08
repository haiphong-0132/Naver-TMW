"use client";

import { useState, useRef, useEffect } from "react";
import { ClovaMessage } from "@/lib/types";

interface ChatInterfaceProps {
  onSendMessage: (messages: ClovaMessage[]) => Promise<{
    messages: ClovaMessage[];
    error?: string;
  }>;
  initialSystemMessage?: string;
}

export default function ChatInterface({
  onSendMessage,
  initialSystemMessage,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ClovaMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ClovaMessage = {
      role: "user",
      content: input.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const result = await onSendMessage(newMessages);

      console.log("Server response:", result);

      if (result.error) {
        setError(result.error);
      } else {
        console.log("Setting messages to:", result.messages);
        setMessages(result.messages);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error in handleSubmit:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  // Filter out system and tool response messages for display
  // Keep user messages, assistant messages with content, and tool call messages
  const displayMessages = messages.filter(
    (msg) => msg.role === "user" || msg.role === "assistant"
  );

  console.log("Total messages:", messages.length, "Display messages:", displayMessages.length);

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <h2 className="text-xl font-semibold text-black">Chat</h2>
        {displayMessages.length > 0 && (
          <button
            onClick={clearChat}
            className="text-sm text-black hover:text-gray-700 px-3 py-1 rounded border border-gray-300 hover:border-gray-500"
          >
            Clear Chat
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {displayMessages.length === 0 && (
          <div className="text-center text-gray-700 mt-8">
            <p className="text-lg mb-2 font-semibold text-black">Start a conversation</p>
            {initialSystemMessage && (
              <p className="text-base text-gray-800">{initialSystemMessage}</p>
            )}
          </div>
        )}

        {displayMessages.map((message, index) => {
          // Check if this is a tool call message (assistant message with toolCalls and no content)
          const contentText = typeof message.content === 'string' ? message.content : '';
          const isToolCall = message.role === "assistant" && message.toolCalls && !contentText.trim();

          if (isToolCall && message.toolCalls) {
            return (
              <div key={index} className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-purple-50 border border-purple-200">
                  <div className="text-xs font-semibold mb-2 text-purple-700">
                    🔧 Tool Call
                  </div>
                  {message.toolCalls.map((toolCall, tcIndex) => (
                    <div key={tcIndex} className="text-sm text-purple-900">
                      <span className="font-medium">{toolCall.function.name}</span>
                      <span className="text-purple-600 ml-2">
                        ({Object.entries(toolCall.function.arguments).map(([key, value]) =>
                          `${key}: "${value}"`
                        ).join(", ")})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          // Regular message display
          return (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <div className={`text-xs font-semibold mb-1 ${
                  message.role === "user" ? "text-blue-100" : "text-gray-700"
                }`}>
                  {message.role === "user" ? "You" : "Assistant"}
                </div>
                <div className="whitespace-pre-wrap break-words text-base">
                  {typeof message.content === 'string' ? message.content : JSON.stringify(message.content)}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-900 rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="animate-pulse">Thinking...</div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="bg-red-100 text-red-700 rounded-lg px-4 py-2 max-w-[80%]">
              <div className="text-xs font-semibold mb-1">Error</div>
              <div className="text-sm">{error}</div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

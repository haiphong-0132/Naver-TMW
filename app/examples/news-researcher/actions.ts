"use server";

import { ClovaXClient } from "@/app/api/clovax/client";
import { ClovaMessage, NewsSearchParams, NewsArticle } from "@/lib/types";
import { searchNewsTool } from "@/lib/tools";

/**
 * Execute a news search using NewsAPI
 */
async function executeNewsSearch(params: NewsSearchParams): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWSAPI_KEY;

  if (!apiKey) {
    throw new Error("NEWSAPI_KEY environment variable is not set");
  }

  try {
    // Build query parameters
    const queryParams = new URLSearchParams({
      q: params.query,
      language: params.language || "en",
      sortBy: params.sortBy || "publishedAt",
      pageSize: "5", // Limit to 5 articles for concise responses
    });

    if (params.fromDate) {
      queryParams.append("from", params.fromDate);
    }
    if (params.toDate) {
      queryParams.append("to", params.toDate);
    }

    // Call NewsAPI using native fetch
    const response = await fetch(
      `https://newsapi.org/v2/everything?${queryParams.toString()}`,
      {
        headers: {
          "X-Api-Key": apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`NewsAPI returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status === "ok" && data.articles) {
      return data.articles as NewsArticle[];
    }

    throw new Error(data.message || "Failed to fetch news articles");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`NewsAPI error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Chat with ClovaX and handle tool calls for news research
 */
export async function chatWithNewsResearcher(
  messages: ClovaMessage[]
): Promise<{ messages: ClovaMessage[]; error?: string }> {
  try {
    console.log("=== chatWithNewsResearcher called ===");
    console.log("Input messages:", JSON.stringify(messages, null, 2));

    const client = new ClovaXClient();

    // Add system message if not present
    if (messages.length === 0 || messages[0].role !== "system") {
      messages.unshift({
        role: "system",
        content:
          "You are a helpful news research assistant. When users ask about news or current events, use the search_news tool to find relevant articles. Provide concise summaries of the news articles you find, highlighting key points and sources. Always be objective and cite your sources.",
      });
    }

    // Create request with the search_news tool
    const request = client.createRequest(messages, [searchNewsTool]);

    // Call ClovaX API
    const response = await client.createChatCompletion(request);

    console.log("ClovaX Response:", JSON.stringify(response, null, 2));

    const assistantMessage = response.result.message;
    messages.push(assistantMessage);

    // Check if ClovaX wants to call a tool
    if (
      response.result.finishReason === "tool_calls" &&
      assistantMessage.toolCalls &&
      assistantMessage.toolCalls.length > 0
    ) {
      console.log("Tool calls detected:", assistantMessage.toolCalls);

      // Execute all tool calls
      for (const toolCall of assistantMessage.toolCalls) {
        if (toolCall.function.name === "search_news") {
          try {
            // Arguments are already an object, not a JSON string
            const args: NewsSearchParams = toolCall.function.arguments as NewsSearchParams;

            console.log("Executing news search with args:", args);

            // Execute the news search
            const articles = await executeNewsSearch(args);

            console.log(`Found ${articles.length} articles:`, articles.map(a => a.title));

            // Format the results
            const formattedResults = articles
              .map(
                (article, index) =>
                  `${index + 1}. **${article.title}**\n   Source: ${article.source.name}\n   Published: ${new Date(article.publishedAt).toLocaleDateString()}\n   Description: ${article.description || "No description available"}\n   URL: ${article.url}\n`
              )
              .join("\n");

            // Add tool response to messages
            const toolMessage = {
              role: "tool" as const,
              content: `Found ${articles.length} news articles:\n\n${formattedResults}`,
              toolCallId: toolCall.id,
            };
            console.log("Adding tool message to messages:", toolMessage);
            messages.push(toolMessage);
          } catch (error) {
            // Handle tool execution error
            const errorMessage =
              error instanceof Error ? error.message : "Unknown error occurred";
            console.error("Error executing news search:", error);
            messages.push({
              role: "tool",
              content: `Error searching news: ${errorMessage}`,
              toolCallId: toolCall.id,
            });
          }
        }
      }

      // Call ClovaX again with the tool results to get the final response
      // Note: When passing tool results back, we can use maxTokens
      console.log("Calling ClovaX with tool results, message count:", messages.length);

      const finalRequest = {
        ...client.createRequest(messages),
        maxTokens: 1000,
      };
      const finalResponse = await client.createChatCompletion(finalRequest);

      console.log("Final response:", JSON.stringify(finalResponse, null, 2));

      messages.push(finalResponse.result.message);
    }

    console.log("Returning messages, count:", messages.length);

    // Ensure messages are properly serializable for Next.js Server Actions
    const serializedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
      ...(msg.toolCallId && { toolCallId: msg.toolCallId }),
      ...(msg.toolCalls && { toolCalls: msg.toolCalls }),
    }));

    console.log("Serialized messages:", JSON.stringify(serializedMessages, null, 2));

    return { messages: serializedMessages };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return {
      messages,
      error: errorMessage,
    };
  }
}

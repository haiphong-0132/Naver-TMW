import { Tool } from "./types";

/**
 * Tool definition for searching news articles
 * This tool allows the AI to search for news articles based on user queries
 */
export const searchNewsTool: Tool = {
  type: "function",
  function: {
    name: "search_news",
    description:
      "Search for news articles from various sources. Use this when the user asks about recent news, current events, or specific topics in the news. Returns relevant news articles with titles, descriptions, and sources.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "The search query or keywords to find relevant news articles. For example: 'artificial intelligence', 'climate change', 'sports news'",
        },
        fromDate: {
          type: "string",
          description:
            "Optional: The start date for articles in ISO 8601 format (YYYY-MM-DD). Only articles published after this date will be returned.",
        },
        toDate: {
          type: "string",
          description:
            "Optional: The end date for articles in ISO 8601 format (YYYY-MM-DD). Only articles published before this date will be returned.",
        },
        language: {
          type: "string",
          description:
            "Optional: The language code for articles (e.g., 'en' for English, 'ko' for Korean). Defaults to 'en'.",
          enum: ["ar", "de", "en", "es", "fr", "he", "it", "nl", "no", "pt", "ru", "sv", "zh"],
        },
        sortBy: {
          type: "string",
          description:
            "Optional: How to sort the articles. 'relevancy' = most relevant first, 'popularity' = most popular first, 'publishedAt' = newest first. Defaults to 'publishedAt'.",
          enum: ["relevancy", "popularity", "publishedAt"],
        },
      },
      required: ["query"],
    },
  },
};

/**
 * All available tools for ClovaX
 * Add more tools here as the cookbook expands
 */
export const allTools: Tool[] = [searchNewsTool];

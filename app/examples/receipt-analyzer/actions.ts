"use server";

import { ClovaXClient } from "@/app/api/clovax/client";
import { ClovaMessage } from "@/lib/types";

/**
 * Analyze a receipt image using ClovaX Vision (HCX-005)
 */
export async function analyzeReceipt(
  imageData: string
): Promise<{ analysis: string; error?: string }> {
  try {
    console.log("=== analyzeReceipt called ===");

    // Use HCX-005 vision model
    const client = new ClovaXClient("HCX-005");

    // Keep the full data URI (including the data:image/...;base64, prefix)
    // The API expects the full data URI, not just the base64 string
    const dataUriString = imageData;

    // Create a message with the receipt image
    // Note: Using plain objects instead of typed to ensure correct JSON structure
    const messages: any[] = [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "You are a helpful assistant that analyzes receipt images. Extract all relevant information including restaurant/store name, items purchased, quantities, individual prices, subtotal, total, payment information, and any other relevant details. Format the response in a clear, structured way.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            imageUrl: null,
            dataUri: {
              data: dataUriString,
            },
          },
          {
            type: "text",
            text: "Please analyze this receipt and extract all the information you can find. Include the store name, items, prices, quantities, totals, and any other relevant details.",
          },
        ],
      },
    ];

    console.log("Sending request to ClovaX Vision...");

    // Create request for HCX-005 (vision model) - match the working curl exactly
    const request = {
      messages,
      topP: 0.8,
      topK: 0,
      maxTokens: 1000,
      temperature: 0.5,
      repetitionPenalty: 1.1,
      stop: [],
    };

    console.log("=== REQUEST DETAILS ===");
    console.log("Endpoint:", client["endpoint"]);

    // Log request without the full base64 data
    const requestForLog = {
      ...request,
      messages: request.messages.map((msg: any) => ({
        role: msg.role,
        content: Array.isArray(msg.content)
          ? msg.content.map((part: any) => ({
              type: part.type,
              ...(part.text && { text: part.text.substring(0, 50) + "..." }),
              ...(part.imageUrl && { imageUrl: "{ url: ... }" }),
              ...(part.dataUri && { dataUri: `{ data: [${dataUriString.length} chars] }` }),
            }))
          : typeof msg.content === "string"
          ? msg.content.substring(0, 50) + "..."
          : msg.content,
      })),
    };
    console.log("Request structure:", JSON.stringify(requestForLog, null, 2));
    console.log("Data URI length:", dataUriString.length);
    console.log("Data URI prefix:", dataUriString.substring(0, 50));

    // Call ClovaX Vision API with HCX-005 model
    const response = await client.createChatCompletion(request);

    console.log("ClovaX Vision Response:", JSON.stringify(response, null, 2));

    const assistantMessage = response.result.message;

    // Extract text content from the response
    let analysisText = "";
    if (typeof assistantMessage.content === "string") {
      analysisText = assistantMessage.content;
    } else if (Array.isArray(assistantMessage.content)) {
      // If content is an array, extract text parts
      analysisText = assistantMessage.content
        .filter((part) => part.type === "text" && part.text)
        .map((part) => part.text)
        .join("\n");
    }

    return { analysis: analysisText };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error analyzing receipt:", error);
    return {
      analysis: "",
      error: errorMessage,
    };
  }
}

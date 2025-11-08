"use client";

import Link from "next/link";

export default function LessonPlanPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2 text-black">
            ClovaX API Workshop: 90-Minute Lesson Plan
          </h1>
          <p className="text-lg text-gray-600">
            A comprehensive guide to teaching ClovaX Chat Completions API with hands-on examples
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Overview Section */}
        <section className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-black">Workshop Overview</h2>
          <div className="space-y-4 text-black">
            <div>
              <h3 className="font-semibold text-lg mb-2">Learning Objectives</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Understand the fundamentals of ClovaX Chat Completions API</li>
                <li>Learn to implement tool calling (function calling) with external APIs</li>
                <li>Master multimodal AI capabilities using ClovaX Vision (HCX-005)</li>
                <li>Build two complete working applications</li>
                <li>Apply best practices for API integration and error handling</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Prerequisites</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Basic JavaScript/TypeScript knowledge</li>
                <li>Familiarity with React and Next.js</li>
                <li>Understanding of REST APIs and async/await</li>
                <li>Node.js installed on local machine</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Required Setup</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Naver Cloud Platform account with ClovaX API access</li>
                <li>NewsAPI.org API key (free tier)</li>
                <li>Code editor (VS Code recommended)</li>
                <li>This repository cloned and dependencies installed</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-black">90-Minute Timeline</h2>

          {/* Part 1 */}
          <div className="mb-8 pb-8 border-b">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg mr-4">
                0-15
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">Part 1: Introduction & Setup</h3>
                <p className="text-gray-600">15 minutes</p>
              </div>
            </div>
            <div className="ml-20 space-y-4">
              <div>
                <h4 className="font-semibold text-black mb-2">5 min: Welcome & Context (Lecture)</h4>
                <ul className="list-disc list-inside space-y-1 text-black ml-4">
                  <li>Introduce ClovaX as Naver's LLM platform</li>
                  <li>Explain available models: HCX-005 (multimodal - vision + text) and HCX-007 (text-only with thinking capabilities)</li>
                  <li>Overview of Chat Completions API architecture</li>
                  <li>Discuss real-world use cases</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">5 min: Environment Setup (Hands-on)</h4>
                <ul className="list-disc list-inside space-y-1 text-black ml-4">
                  <li>Clone repository and install dependencies</li>
                  <li>Configure .env.local with API keys</li>
                  <li>Start development server: <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code></li>
                  <li>Verify homepage loads successfully</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">5 min: Code Architecture Tour (Lecture)</h4>
                <ul className="list-disc list-inside space-y-1 text-black ml-4">
                  <li>Explain Next.js App Router structure</li>
                  <li>Review ClovaXClient class (app/api/clovax/client.ts)</li>
                  <li>Discuss Server Actions vs Client Components</li>
                  <li>Show type definitions in lib/types.ts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Part 2 */}
          <div className="mb-8 pb-8 border-b">
            <div className="flex items-center mb-4">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg mr-4">
                15-50
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">Part 2: News Researcher - Tool Calling</h3>
                <p className="text-gray-600">35 minutes</p>
              </div>
            </div>
            <div className="ml-20 space-y-4">
              <div>
                <h4 className="font-semibold text-black mb-2">10 min: Understanding Tool Calling (Lecture)</h4>
                <ul className="list-disc list-inside space-y-1 text-black ml-4">
                  <li>What is tool calling (function calling) and why it matters</li>
                  <li>How LLMs decide when to call tools</li>
                  <li>Tool definition schema and parameters</li>
                  <li>Request/response flow with tool execution</li>
                  <li>Demo: Show lib/tools.ts - the searchNewsTool definition</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">15 min: Code Walkthrough (Hands-on)</h4>
                <div className="ml-4 space-y-2 text-black">
                  <p className="font-medium">Navigate to: app/examples/news-researcher/</p>
                  <div className="ml-4">
                    <p className="font-medium mb-1">1. Review actions.ts (10 min):</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li><strong>executeNewsSearch()</strong>: Integrates with NewsAPI</li>
                      <li><strong>chatWithNewsResearcher()</strong>: Main orchestration logic</li>
                      <li>Key pattern: Send messages → Get tool call → Execute function → Return results → Get final response</li>
                      <li>Error handling and message serialization</li>
                    </ul>
                    <p className="font-medium mt-2 mb-1">2. Review page.tsx (5 min):</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Client component using ChatInterface</li>
                      <li>How Server Actions connect frontend to backend</li>
                      <li>UI patterns for chat applications</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">10 min: Live Testing & Discussion (Hands-on)</h4>
                <ul className="list-disc list-inside space-y-1 text-black ml-4">
                  <li>Navigate to /examples/news-researcher</li>
                  <li>Test with queries: "Latest AI news", "Climate change updates"</li>
                  <li>Open browser DevTools to watch Server Action logs</li>
                  <li>Observe tool call execution in real-time</li>
                  <li>Discuss: When does the AI choose to call the tool vs answering directly?</li>
                  <li>Q&A: Common pitfalls and debugging tips</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Part 3 */}
          <div className="mb-8 pb-8 border-b">
            <div className="flex items-center mb-4">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg mr-4">
                50-80
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">Part 3: Receipt Analyzer - Vision AI</h3>
                <p className="text-gray-600">30 minutes</p>
              </div>
            </div>
            <div className="ml-20 space-y-4">
              <div>
                <h4 className="font-semibold text-black mb-2">8 min: Multimodal AI Concepts (Lecture)</h4>
                <ul className="list-disc list-inside space-y-1 text-black ml-4">
                  <li>Introduction to vision-language models</li>
                  <li>HCX-005: Multimodal model (vision + text) - can process both images and text</li>
                  <li>HCX-007: Text-only model with extended thinking/reasoning capabilities</li>
                  <li>Image input formats: URLs vs data URIs (base64)</li>
                  <li>Message content structure for multimodal requests</li>
                  <li>Use cases: OCR, image understanding, document analysis</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">12 min: Code Walkthrough (Hands-on)</h4>
                <div className="ml-4 space-y-2 text-black">
                  <p className="font-medium">Navigate to: app/examples/receipt-analyzer/</p>
                  <div className="ml-4">
                    <p className="font-medium mb-1">1. Review actions.ts (7 min):</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li><strong>analyzeReceipt()</strong>: Single-call vision analysis</li>
                      <li>Using HCX-005 model (supports both vision and text)</li>
                      <li>Message content array with both text and image_url parts</li>
                      <li>dataUri structure: Must include full data:image/...;base64, prefix</li>
                      <li>Response parsing: Extract text from content array</li>
                    </ul>
                    <p className="font-medium mt-2 mb-1">2. Review page.tsx (5 min):</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>File upload handling with FileReader API</li>
                      <li>Converting images to base64 data URIs</li>
                      <li>State management for loading and errors</li>
                      <li>UI layout with image preview and results panel</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">10 min: Live Testing & Experimentation (Hands-on)</h4>
                <ul className="list-disc list-inside space-y-1 text-black ml-4">
                  <li>Navigate to /examples/receipt-analyzer</li>
                  <li>Analyze the default receipt image</li>
                  <li>Upload student receipts (or other documents)</li>
                  <li>Compare results quality and accuracy</li>
                  <li>Experiment: Try other document types (invoices, forms, menus)</li>
                  <li>Discuss: What types of information does it extract well/poorly?</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Part 4 */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg mr-4">
                80-90
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">Part 4: Wrap-up & Next Steps</h3>
                <p className="text-gray-600">10 minutes</p>
              </div>
            </div>
            <div className="ml-20 space-y-4">
              <div>
                <h4 className="font-semibold text-black mb-2">5 min: Key Takeaways Review (Discussion)</h4>
                <ul className="list-disc list-inside space-y-1 text-black ml-4">
                  <li>Compare and contrast: Tool calling vs single-call vision</li>
                  <li>Model selection: HCX-005 (multimodal) vs HCX-007 (text with thinking)</li>
                  <li>Best practices: Error handling, API key security, rate limiting</li>
                  <li>Production considerations: Costs, latency, scaling</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">5 min: Extension Ideas & Resources (Open-ended)</h4>
                <div className="ml-4 space-y-2 text-black">
                  <p className="font-medium">Challenge Students to Build:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Add more tools to News Researcher (weather, stocks, translations)</li>
                    <li>Create a document comparison tool using vision</li>
                    <li>Build a customer service chatbot with tool calling</li>
                    <li>Implement streaming responses for real-time output</li>
                  </ul>
                  <p className="font-medium mt-3">Additional Resources:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>ClovaX API Documentation</li>
                    <li>Naver Cloud Platform console</li>
                    <li>Community forums and support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teaching Tips Section */}
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Teaching Tips</h2>
          <div className="space-y-4 text-blue-900">
            <div>
              <h3 className="font-semibold mb-2">Pacing Strategies</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Keep lectures concise (5-10 min max) before hands-on work</li>
                <li>Have code pre-loaded in tabs to avoid context switching delays</li>
                <li>If running behind, shorten Q&A and live testing sections</li>
                <li>If ahead of schedule, add debugging exercises or edge cases</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Common Student Questions</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>"Why use Server Actions?"</strong> → Security (API keys), simplified data flow, SSR benefits</li>
                <li><strong>"Can I use this in production?"</strong> → Yes, but add rate limiting, caching, monitoring</li>
                <li><strong>"What if the tool call fails?"</strong> → Show error handling in actions.ts:132-142</li>
                <li><strong>"How much does ClovaX cost?"</strong> → Point to NCP pricing page, discuss token counting</li>
                <li><strong>"Which model should I use?"</strong> → HCX-005 for vision/multimodal, HCX-007 for complex reasoning with thinking</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Interactive Elements</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Ask students to predict: "What will the AI do with this query?"</li>
                <li>Code-along moments: Have students modify tool parameters</li>
                <li>Pair programming: One drives, one navigates through code</li>
                <li>Share screen: Show student implementations to the class</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Code Reference Section */}
        <section className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-black">Key Code References</h2>
          <div className="space-y-4 text-black">
            <div>
              <h3 className="font-semibold text-lg mb-2">Core Files to Highlight</h3>
              <div className="bg-gray-50 rounded p-4 space-y-2 text-sm font-mono">
                <div><strong>app/api/clovax/client.ts</strong> - ClovaX API client wrapper</div>
                <div><strong>lib/types.ts</strong> - TypeScript type definitions</div>
                <div><strong>lib/tools.ts</strong> - Tool (function) definitions</div>
                <div><strong>app/examples/news-researcher/actions.ts:65-181</strong> - Tool calling flow</div>
                <div><strong>app/examples/receipt-analyzer/actions.ts:9-118</strong> - Vision API usage</div>
                <div><strong>components/ChatInterface.tsx</strong> - Reusable chat UI</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Critical Code Patterns</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium mb-1">Tool Calling Pattern:</p>
                  <div className="bg-gray-50 rounded p-3 text-sm">
                    <code className="block whitespace-pre">
{`1. Define tool schema with name, description, parameters
2. Send messages array + tools to API
3. Check finishReason === "tool_calls"
4. Execute tool function(s)
5. Add tool response(s) to messages
6. Call API again for final response`}
                    </code>
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-1">Vision API Pattern:</p>
                  <div className="bg-gray-50 rounded p-3 text-sm">
                    <code className="block whitespace-pre">
{`1. Convert image to base64 data URI
2. Create content array with text + image_url parts
3. Use HCX-005 model
4. Extract text from response content array`}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Assessment Section */}
        <section className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-black">Assessment & Practice</h2>
          <div className="space-y-4 text-black">
            <div>
              <h3 className="font-semibold text-lg mb-2">Check for Understanding</h3>
              <div className="ml-4 space-y-2">
                <p className="font-medium">Ask students to explain:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>What happens between tool_calls and the final response?</li>
                  <li>Why do we need a system message?</li>
                  <li>What's the difference between HCX-005 and HCX-007?</li>
                  <li>When would you use HCX-005 vs HCX-007?</li>
                  <li>How would you add a new tool to News Researcher?</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Hands-on Challenges (Optional Homework)</h3>
              <div className="space-y-2">
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <p className="font-medium text-yellow-900">Beginner: Modify News Researcher</p>
                  <p className="text-sm text-yellow-800 mt-1">
                    Change the number of articles returned from 5 to 10. Update the UI to display source logos.
                  </p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded p-3">
                  <p className="font-medium text-orange-900">Intermediate: Add a Second Tool</p>
                  <p className="text-sm text-orange-800 mt-1">
                    Create a weather tool that ClovaX can call. Use OpenWeatherMap API or similar.
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="font-medium text-red-900">Advanced: Multi-Image Comparison</p>
                  <p className="text-sm text-red-800 mt-1">
                    Extend Receipt Analyzer to accept 2 images and compare them (e.g., find price differences).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting Section */}
        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-2xl font-bold mb-4 text-black">Common Issues & Solutions</h2>
          <div className="space-y-3 text-black">
            <div className="border-l-4 border-red-500 pl-4">
              <p className="font-semibold">Error: "NEWSAPI_KEY environment variable is not set"</p>
              <p className="text-sm mt-1">Solution: Check .env.local file exists and has correct format. Restart dev server.</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <p className="font-semibold">Error: 401 Unauthorized from ClovaX API</p>
              <p className="text-sm mt-1">Solution: Verify CLOVAX_API_KEY, CLIENT_ID, and CLIENT_SECRET in .env.local. Check NCP console for correct values.</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <p className="font-semibold">Receipt analyzer returns empty response</p>
              <p className="text-sm mt-1">Solution: Ensure image is not too large (max 4MB). Check that data URI includes full prefix. Verify HCX-005 model access.</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <p className="font-semibold">Tool calling doesn't trigger</p>
              <p className="text-sm mt-1">Solution: Check tool schema format. Make query more explicit ("search for news about..."). Verify finishReason check logic.</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="font-semibold">Slow responses from API</p>
              <p className="text-sm mt-1">Note: Vision models are slower than text-only. Set expectations for 5-10 second response times.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { openai } from "@ai-sdk/openai";
import { createTool } from "@convex-dev/agent";
import { generateText } from "ai";
import { supportAgent } from "../agents/supportAgent.js";

import z from "zod";

import { internal } from "@workspace/backend/_generated/api.js";
import rag from "../rag.js";
import { query } from "@workspace/backend/_generated/server.js";
import { SEARCH_INTERPRETER_PROMPT } from "../constants.js";

export const search = createTool({
  description:
    "Search the knowledge base for relevant information to help answer questions",
  args: z.object({
    query: z.string().describe("The search query to find relevant information"),
  }),

  handler: async (ctx, args) => {
    if (!ctx.threadId) {
      return "Missing Thread ID";
    }

    const conversation = await ctx.runQuery(
      internal.system.conversations.getByThreadId,
      { threadId: ctx.threadId }
    );

    if (!conversation) {
      return "Conversation not found";
    }

    const orgId = conversation.organizationId;

    const searchResult = await rag.search(ctx, {
      namespace: orgId,
      query: args.query,
      limit: 5,
    });

    const contextText = `Fount results in ${searchResult.entries
      .map((e) => e.title || null)
      .filter((title) => title !== null)
      .join(", ")}. Here is the context:\n\n${searchResult.text}`;

    const response = await generateText({
      messages: [
        {
          role: "system",
          content: SEARCH_INTERPRETER_PROMPT,
        },
        {
          role: "user",
          content: `User asked: "${args.query}"\n\nSearch results: ${contextText}`,
        },
      ],
      model: openai.chat("gpt-4o-mini"),
    });

    await supportAgent.saveMessage(ctx, {
      threadId: ctx.threadId,
      message: {
        role: "assistant",
        content: response.text,
      },
    });

    return response.text;
  },
});

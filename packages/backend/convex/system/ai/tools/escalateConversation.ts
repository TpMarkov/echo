import { createTool } from "@convex-dev/agent";
import { supportAgent } from "../agents/supportAgent.js";

import { internal } from "@workspace/backend/_generated/api.js";

import { z } from "zod";
import { internalMutation } from "@workspace/backend/_generated/server.js";
import { threadId } from "worker_threads";

export const escalateConversation = createTool({
  description: "Escalate conversation",
  args: z.object({}),
  handler: async (ctx) => {
    if (!ctx.threadId) {
      return "Missing thread ID";
    }

    await ctx.runMutation(internal.system.conversations.escalate, {
      threadId: ctx.threadId,
    });

    await supportAgent.saveMessage(ctx, {
      threadId: ctx.threadId,
      message: {
        role: "assistant",
        content: "Conversation escalated to a human operator",
      },
    });

    return "Conversation escalated to a human operator";
  },
});

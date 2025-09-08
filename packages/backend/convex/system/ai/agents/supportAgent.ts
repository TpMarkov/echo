import { openai } from "@ai-sdk/openai";
import { Agent } from "@convex-dev/agent";
import { components } from "../../../_generated/api.js";
import { SUPPORT_AGENT_PROMPT } from "../constants.js";

export const supportAgent = new Agent(components.agent, {
  chat: openai.chat("gpt-4.1-mini"),
  instructions: SUPPORT_AGENT_PROMPT,
});

import { v } from "convex/values";
import { mutation } from "@workspace/backend/_generated/server.js";

const SESSION_DURATION_MS = 5000;
// 24 * 60 * 60 * 1000; for 24h

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    organizationId: v.string(),
    metadata: v.optional(
      v.object({
        userAgent: v.optional(v.string()),
        language: v.optional(v.string()),
        languages: v.optional(v.string()),
        platform: v.optional(v.string()),
        vendor: v.optional(v.string()),
        screenResolution: v.optional(v.string()),
        viewportSize: v.optional(v.string()),
        cookieEnabled: v.optional(v.boolean()),
        referrer: v.optional(v.string()),
        currentUrl: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const expiresAt = now + SESSION_DURATION_MS;

    const contactSessionId = await ctx.db.insert("contactSession", {
      name: args.name,
      email: args.email,
      organizationId: args.organizationId,
      expiresAt,
      metadata: args.metadata,
    });

    return contactSessionId;
  },
});

export const validate = mutation({
  args: {
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.db.get(args.contactSessionId);

    if (!contactSession) {
      return { valid: false, reason: "Contact session not found" };
    }

    if (contactSession.expiresAt < Date.now()) {
      return { valid: false, reason: "Contact session expired" };
    }

    return { valid: true, contactSession };
  },
});

import { v } from "convex/values";
import { action, mutation } from "../_generated/server.js";
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY || "",
});

export const validate = action({
  args: {
    organizationId: v.string(),
  },
  handler: async (_, args) => {
    console.log(args.organizationId);

    const organization = await clerkClient.organizations.getOrganization({
      organizationId: args.organizationId,
    });

    if (organization) {
      return { valid: true };
    } else {
      return { valid: false, reason: "Organization not valid" };
    }
  },
});

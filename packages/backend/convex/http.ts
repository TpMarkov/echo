import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server.js";
import { Webhook } from "svix";
import { createClerkClient, type WebhookEvent } from "@clerk/backend";
import { internal } from "./_generated/api.js";

const http = httpRouter();

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const event = await validateRequest(req);

    if (!event) {
      throw new Response("Error occured", { status: 400 });
    }

    switch (event.type) {
      case "subscription.updated": {
        const subscription = event.data as {
          status: string;
          payer?: {
            organization_id: string;
          };
        };

        const organizationId = subscription.payer?.organization_id;

        if (!organizationId) {
          return new Response("Missing Organization ID", { status: 400 });
        }

        const newMaxAllowedMemberships =
          subscription.status === "active" ? 5 : 1;

        await clerkClient.organizations.updateOrganization(organizationId, {
          maxAllowedMemberships: 5,
        });

        await ctx.runMutation(internal.system.subscriptions.upsert, {
          organizationId,
          status: subscription.status,
        });

        break;
      }
      default:
        console.log("Ignore Clerk webhook event", event.type);
    }

    return new Response(null, { status: 200 });
  }),
});

async function validateRequest(req: Request): Promise<WebhookEvent | null> {
  const payloadString = await req.text();
  const svixHeaders = {
    "svix-id": req.headers.get("svix-id") || "",
    "svix-timestamp": req.headers.get("svix-timestamp") || "",
    "svix-signature": req.headers.get("svix-signature") || "",
  };

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  try {
    return wh.verify(payloadString, svixHeaders) as unknown as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook event", error);
    return null;
  }
}

export default http;

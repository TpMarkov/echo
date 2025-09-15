import { Vapi, VapiClient } from "@vapi-ai/server-sdk";

import { internal } from "../_generated/api.js";
import { action } from "../_generated/server.js";

import { getSecretValue, parseSecretString } from "../lib/secrets.js";
import { ConvexError } from "convex/values";

export const getPhoneNumbers = action({
  args: {},
  handler: async (ctx, args): Promise<Vapi.PhoneNumbersListResponseItem[]> => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found",
      });
    }

    const orgId = identity.orgId as string;

    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    const plugin = await ctx.runQuery(
      internal.system.plugins.getByOrganizationId,
      {
        organizationId: orgId,
        service: "vapi",
      }
    );

    if (!plugin) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Plugin not found",
      });
    }

    const secretName = plugin.secretName;
    const secretValue = await getSecretValue(secretName);

    const secretData = parseSecretString<{
      privateApiKey: string;
      publicApiKey: string;
    }>(secretValue);

    if (!secretData) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Credentials not found",
      });
    }

    if (!secretData.privateApiKey || !secretData.publicApiKey) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Credentials incomplete. Please reconnect your Vapi account",
      });
    }

    const vapiClient = new VapiClient({
      token: secretData.privateApiKey,
    });

    const phoneNumbers = await vapiClient.phoneNumbers.list();

    return phoneNumbers;
  },
});

export const getAssistants = action({
  args: {},
  handler: async (ctx, args): Promise<Vapi.Assistant[]> => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found",
      });
    }

    const orgId = identity.orgId as string;

    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    const plugin = await ctx.runQuery(
      internal.system.plugins.getByOrganizationId,
      {
        organizationId: orgId,
        service: "vapi",
      }
    );

    if (!plugin) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Plugin not found",
      });
    }

    const secretName = plugin.secretName;
    const secretValue = await getSecretValue(secretName);

    const secretData = parseSecretString<{
      privateApiKey: string;
      publicApiKey: string;
    }>(secretValue);

    if (!secretData) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Credentials not found",
      });
    }

    if (!secretData.privateApiKey || !secretData.publicApiKey) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Credentials incomplete. Please reconnect your Vapi account",
      });
    }

    const vapiClient = new VapiClient({
      token: secretData.privateApiKey,
    });

    const assistants = await vapiClient.assistants.list();

    return assistants;
  },
});

import { mutation, query } from "./_generated/server.js";

export const getMany = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    return users;
  },
});

export const add = mutation({
  args: {},

  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authorized");
    }

    const userId = await ctx.db.insert("users", {
      name: "Tsvetan",
    });

    return userId;
  },
});

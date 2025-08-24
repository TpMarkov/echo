"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const users = useQuery(api.users.getMany) || [];
  const addUser = useMutation(api.users.add);

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <h1 className="text-2xl font-bold">Hello Apps Web</h1>
      <Button onClick={() => addUser()}>Add user</Button>
      <div className="max-w-sm w-full mx-auto">
        {users.length > 0
          ? users.map((user) => JSON.stringify(user, null, 2))
          : "No users found yet"}
      </div>
    </div>
  );
}

"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Page() {
  const users = useQuery(api.users.getMany) || [];
  const addUser = useMutation(api.users.add);

  const { isLoaded, isSignedIn } = useUser();

  return (
    <>
      {isSignedIn ? (
        <>
          <div className="flex flex-col items-center justify-center min-h-svh gap-y-4">
            <Button onClick={() => addUser()}>Add user</Button>

            <UserButton />
            <div className="max-w-sm w-full mx-auto">
              {JSON.stringify(users, null, 2)}
            </div>
          </div>
          {/* More signed-in content */}
        </>
      ) : (
        <SignInButton />
      )}
    </>
  );
}

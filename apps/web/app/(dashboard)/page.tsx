"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";

export default function Page() {
  const users = useQuery(api.users.getMany) || [];
  const addUser = useMutation(api.users.add);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <p>Apps / Web</p>
        <UserButton></UserButton>
        <OrganizationSwitcher hidePersonal />
      </div>
    </>
  );
}

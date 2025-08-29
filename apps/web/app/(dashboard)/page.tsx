"use client";

import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";

export default function Page() {
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

"use client";

import { AuthLoading } from "convex/react";
import { AuthLayout } from "../layouts/auth-layout";
import { SignInView } from "../views/sign-in-view";

import { useUser } from "@clerk/nextjs";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <>
      <AuthLoading>
        <AuthLayout>
          <p>Loading...</p>
        </AuthLayout>
      </AuthLoading>
      <AuthLayout>{isSignedIn ? children : <SignInView />}</AuthLayout>
    </>
  );
};

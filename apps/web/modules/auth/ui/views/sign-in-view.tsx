"use client";
import { SignIn } from "@clerk/nextjs";

export const SignInView = () => {
  return <SignIn routing="hash"></SignIn>;
};

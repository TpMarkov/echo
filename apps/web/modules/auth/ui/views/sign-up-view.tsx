"use client";

import { SignUp } from "@clerk/nextjs";

export const SignUpView = () => {
  return <SignUp routing="hash"></SignUp>;
};

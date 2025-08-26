import React from "react";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen max-w-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

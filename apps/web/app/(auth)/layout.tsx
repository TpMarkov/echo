import React from "react";
import layout from "../layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen max-w-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default Layout;

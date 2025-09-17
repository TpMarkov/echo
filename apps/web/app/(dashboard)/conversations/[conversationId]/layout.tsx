import { ConversationIdLayout } from "@/modules/dashboard/layouts/conversation-id-layout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <ConversationIdLayout>{children}</ConversationIdLayout>;
};

export default layout;

import { ConversationsLayout } from "@/modules/dashboard/layouts/conversations-layout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <ConversationsLayout>{children}</ConversationsLayout>;
};

export default layout;

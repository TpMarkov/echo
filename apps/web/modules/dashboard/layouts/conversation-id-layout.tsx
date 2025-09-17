"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";
import ContactPanel from "../ui/components/contact-panel";

export const ConversationIdLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <ResizablePanelGroup className="h-full flex-1" direction="horizontal">
        <ResizablePanel className="h-full" defaultSize={60}>
          <div className="flex h-full flex-1 flex-col">{children}</div>
        </ResizablePanel>
        <ResizableHandle className="hidden lg:block" />
        <ResizablePanel
          className="hidden lg:block"
          defaultSize={40}
          maxSize={40}
          minSize={20}
        >
          <ContactPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

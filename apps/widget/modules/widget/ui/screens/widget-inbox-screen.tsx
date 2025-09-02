"use client";

import { Button } from "@workspace/ui/components/button";
import { WidgetFooter } from "../components/widget-footer";
import { WidgetHeader } from "../components/widget-header";
import { ArrowLeftIcon } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import { formatDistanceToNow } from "date-fns";
import { ConversationsStatusIcon } from "@workspace/ui/components/conversation-status-icon";
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  organizationIdAtom,
  screenAtom,
} from "../../atoms/widget-atoms";
import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";

export const WidgetInboxScreen = () => {
  const screen = useAtomValue(screenAtom);
  const setScreen = useSetAtom(screenAtom);

  const setConversationId = useSetAtom(conversationIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const conversations = usePaginatedQuery(
    api.public.conversations.getMany,
    contactSessionId
      ? {
          contactSessionId,
        }
      : "skip",
    { initialNumItems: 20 }
  );

  const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore } =
    useInfiniteScroll({
      status: conversations.status,
      loadMore: conversations.loadMore,
      loadSize: 20,
      observerEnabled: false,
    });

  return (
    <>
      <WidgetHeader>
        <div className="flex items-center gap-x-2">
          <Button
            variant={"transparent"}
            size={"icon"}
            onClick={() => setScreen("selection")}
          >
            <ArrowLeftIcon></ArrowLeftIcon>
          </Button>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col gap-y-2 p-4 overflow-y-auto">
        {conversations?.results.length > 0 &&
          conversations.results.map((conversation) => {
            return (
              <Button
                variant={"outline"}
                className="h-20 w-full justify-between"
                key={conversation._id}
                onClick={() => {
                  setConversationId(conversation._id);
                  setScreen("chat");
                }}
              >
                <div className="flex w-full flex-col gap-4 overflow-hidden text-start">
                  <div className="flex w-full items-center justify-between gap-x-2">
                    <p className="text-muted-foreground text-xs">Chat</p>
                    <p className="text-muted-foreground text-xs">
                      {formatDistanceToNow(
                        new Date(conversation._creationTime)
                      )}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between gap-x-2">
                    <p className="truncate text-sm">
                      {conversation.lastMessage?.text}
                    </p>
                    <ConversationsStatusIcon status={conversation.status} />
                  </div>
                </div>
              </Button>
            );
          })}
        <InfiniteScrollTrigger
          noMoreText={"No more conversations"}
          canLoadMore={canLoadMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={handleLoadMore}
          ref={topElementRef}
        />
      </div>
      <WidgetFooter />
    </>
  );
};

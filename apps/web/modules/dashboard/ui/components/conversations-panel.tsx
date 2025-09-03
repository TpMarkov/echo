"use client";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { ConversationsStatusIcon } from "@workspace/ui/components/conversation-status-icon";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  Select,
  SelectValue,
} from "@workspace/ui/components/select";
import { usePaginatedQuery } from "convex/react";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import {
  ListIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  CheckIcon,
  CornerUpLeftIcon,
} from "lucide-react";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";

import { api } from "@workspace/backend/_generated/api.js";
import { getCountriesForTimezone } from "countries-and-timezones";
import Link from "next/link";
import { cn } from "@workspace/ui/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai/react";
import { statusFilterAtom } from "../../atoms";
import { Skeleton } from "@workspace/ui/components/skeleton";

export const ConversationsPanel = () => {
  const statusFilter = useAtomValue(statusFilterAtom);
  const setStatusFilter = useSetAtom(statusFilterAtom);

  const pathname = usePathname();

  const conversations = usePaginatedQuery(
    api.private.conversations.getMany,
    {
      status: statusFilter === "all" ? undefined : statusFilter,
    },
    {
      initialNumItems: 10,
    }
  );

  const {
    topElementRef,
    handleLoadMore,
    canLoadMore,
    isLoadingFirstPage,
    isLoadingMore,
  } = useInfiniteScroll({
    status: conversations.status,
    loadMore: conversations.loadMore,
    loadSize: 10,
  });

  useEffect(() => {
    console.log(conversations);
  }, [conversations]);

  return (
    <div className="flex h-full w-full flex-col bg-background text-sidebar-foreground">
      <div className="flex flex-col gap-3.5 border-b-2">
        <Select
          defaultValue="all"
          onValueChange={(value) => {
            setStatusFilter(
              value as "unresolved" | "resolved" | "escalated" | "all"
            );
          }}
          value={statusFilter}
        >
          <SelectTrigger className="h-8 border-none px-1.5 shadow-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-0">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <ListIcon className="size-4" />
                <span>All</span>
              </div>
            </SelectItem>
            <SelectItem value="unresolved">
              <div className="flex items-center gap-2">
                <ArrowRightIcon className="size-4" />
                <span>Unresolved</span>
              </div>
            </SelectItem>
            <SelectItem value="escalated">
              <div className="flex items-center gap-2">
                <ArrowUpIcon className="size-4" />
                <span>Escalated</span>
              </div>
            </SelectItem>
            <SelectItem value="resolved">
              <div className="flex items-center gap-2">
                <CheckIcon className="size-4" />
                <span>Resolved</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="max-h-[calc(100vh-53px)]">
        <div className="flex w-full flex-1 flex-col text-sm">
          {conversations.results.map((conversation) => {
            const isLastMessageFromOperator =
              conversation.lastMessage?.message?.role !== "user";

            const countryFlag = "/logo.svg";

            return (
              <Link
                key={conversation._id}
                href={`/conversations/${conversation._id}`}
                className={cn(
                  "relative flex cursor-pointer px-4 items-start gap-3 border-b-4 py-5 text-sm leading-tight hover:bg-accent hover:text-accent-foreground",
                  pathname === `/conversations/${conversation._id}` &&
                    "bg-accent text-accent-foreground"
                )}
              >
                <div
                  className={cn(
                    "-traslate-y-1/2 absolute top-1/2 left-0 h-[64%] w-1 rounded-full bg-neutral-300 opacity-0 transition-opacity",
                    pathname === `/conversations/${conversation._id}` &&
                      "opacity-100"
                  )}
                ></div>
                <DicebearAvatar
                  seed={conversation.contactSessionId}
                  size={40}
                  className="shrink-0"
                  badgeImageUrl={
                    conversation.lastMessage?.message?.role === "assistant"
                      ? "/logo.svg"
                      : ""
                  }
                />
                <div className="flex-1">
                  <div className="w-full flex items-center gap-2">
                    <span className="truncate font-bold">
                      {conversation.contactSession.name}
                    </span>
                    <span className="ml-auto shring-0 text-muted-foreground text-xs">
                      {formatDistanceToNow(conversation._creationTime)} ago
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <div className="flex grow min-w-0 items-center gap-1 overflow-hidden">
                      {isLastMessageFromOperator && (
                        <CornerUpLeftIcon className="size-3 shrink-0 text-muted-foreground" />
                      )}
                      <span
                        className={cn(
                          "line-clamp-1 text-muted-foreground text-xs",
                          !isLastMessageFromOperator && "font-bold text-black"
                        )}
                      >
                        {conversation.lastMessage?.text}
                      </span>
                    </div>
                    <ConversationsStatusIcon status={conversation.status} />
                  </div>
                </div>
              </Link>
            );
          })}
          {isLoadingFirstPage ? (
            <SkeletonCOnversations />
          ) : (
            <InfiniteScrollTrigger
              canLoadMore={canLoadMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={handleLoadMore}
              ref={topElementRef}
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export const SkeletonCOnversations = () => {
  return (
    <div className="flex mnin-h-0 flex-1 flex-col gap-2 overflow-auto">
      <div className="relative flex w-full min-w-0 flex-col p-2">
        <div className="w-full space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="flex items-start gap-3 rounded-lg p-4" key={index}>
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1">
                <div className="flex w-full items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="ml-auto h3 w-12 shrink-0" />
                </div>
                <div className="mt-2">
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

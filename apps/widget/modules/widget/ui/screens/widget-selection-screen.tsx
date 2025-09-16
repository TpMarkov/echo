"use client";

import { Button } from "@workspace/ui/components/button";
import { WidgetHeader } from "../components/widget-header";
import {
  ChevronRight,
  ChevronRightIcon,
  MessageSquareTextIcon,
  MicIcon,
  PhoneIcon,
} from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  errorMessageAtom,
  hasVapiSecretsAtom,
  organizationIdAtom,
  screenAtom,
  widgetSettingsAtom,
} from "../../atoms/widget-atoms";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { useState } from "react";
import { WidgetFooter } from "../components/widget-footer";

export const WidgetSelectionScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const setConversationId = useSetAtom(conversationIdAtom);
  const [isPending, setIsPending] = useState(false);
  const widgetSettings = useAtomValue(widgetSettingsAtom);
  const hasVapiSecrets = useAtomValue(hasVapiSecretsAtom);

  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const createConversation = useMutation(api.public.conversations.create);

  const handleNewConversation = async () => {
    if (!organizationId) {
      setScreen("error");
      setErrorMessage("Organization ID is required");
    }
    if (!contactSessionId) {
      setScreen("auth");
    }

    if (!organizationId || !contactSessionId) {
      setScreen("error");
      setErrorMessage(
        "Both Organization ID and Contact Session ID are required"
      );
      return;
    }

    setIsPending(true);

    const conversationId = await createConversation({
      contactSessionId,
      organizationId,
    });

    setConversationId(conversationId);
    try {
      setScreen("chat");
    } catch (e) {
      setScreen("auth");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="font-semibold text-3xl">Hi there! 👋</p>
          <p className="font-semibold text-lg">Let's get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col gap-y-4 p-4 overflow-y-auto">
        <Button
          disabled={isPending}
          onClick={() => {
            handleNewConversation();
          }}
          className="h-16 w-full justify-between"
          variant={"outline"}
        >
          <div className="flex items-center gap-x-2">
            <MessageSquareTextIcon className="size-4" />
            <span>Start chat</span>
          </div>
          <ChevronRightIcon className="size-4" />
        </Button>
        {hasVapiSecrets && widgetSettings?.vapiSettings?.assistantId && (
          <Button
            disabled={isPending}
            onClick={() => setScreen("voice")}
            className="h-16 w-full justify-between"
            variant={"outline"}
          >
            <div className="flex items-center gap-x-2">
              <MicIcon className="size-4" />
              <span>Start voice call</span>
            </div>
            <ChevronRightIcon className="size-4" />
          </Button>
        )}
        {hasVapiSecrets && widgetSettings?.vapiSettings?.phoneNumber && (
          <Button
            disabled={isPending}
            onClick={() => {
              setScreen("contact");
            }}
            className="h-16 w-full justify-between"
            variant={"outline"}
          >
            <div className="flex items-center gap-x-2">
              <PhoneIcon className="size-4" />
              <span>Call us</span>
            </div>
            <ChevronRightIcon className="size-4" />
          </Button>
        )}
      </div>
      <WidgetFooter />
    </>
  );
};

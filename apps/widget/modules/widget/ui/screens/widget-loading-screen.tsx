"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { LoaderIcon } from "lucide-react";
import {
  contactSessionIdAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  screenAtom,
} from "../../atoms/widget-atoms";
import { WidgetHeader } from "../components/widget-header";
import { useEffect, useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { organizationIdAtom } from "../../atoms/widget-atoms";

type InitStep = "storage" | "org" | "session" | "settings" | "vapi" | "done";

export const WidgetLoadingScreen = ({
  organizationId,
}: {
  organizationId: string | null;
}) => {
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState(false);

  const loadingMessage = useAtomValue(loadingMessageAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);

  const validateOrganization = useAction(api.public.organizations.validate);
  const setScreen = useSetAtom(screenAtom);
  const setLoadingMMessage = useSetAtom(loadingMessageAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);

  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  useEffect(() => {
    if (step !== "org") {
      return;
    }

    setLoadingMMessage("Loading organization...");

    if (!organizationId) {
      setErrorMessage("Organization ID is required");
      setScreen("error");
    }

    setLoadingMMessage("Validating organization...");

    validateOrganization({ organizationId: organizationId as string })
      .then((result) => {
        if (result.valid) {
          setOrganizationId(organizationId);
          setStep("session");
        } else {
          setErrorMessage(result.reason || "Invalid configuration");
          setScreen("error");
        }
      })
      .catch(() => {
        setErrorMessage("Unable to verify organization");
        setScreen("error");
      });

    setLoadingMMessage("Verifying organization...");
  }, [
    step,
    organizationId,
    setErrorMessage,
    setScreen,
    setStep,
    setOrganizationId,
    setLoadingMMessage,
    validateOrganization,
  ]);

  //    Validate session if it exists
  const validateContactSession = useMutation(
    api.public.contactSessions.validate
  );

  useEffect(() => {
    if (step !== "session") {
      return;
    }

    setLoadingMMessage("Finding contact session ID ...");

    if (!contactSessionId) {
      setSessionValid(false);
      setStep("done");
      return;
    }

    setLoadingMMessage("Validating session...");

    validateContactSession({
      contactSessionId,
    })
      .then((result) => {
        setSessionValid(result.valid);
        setStep("done");
      })
      .catch(() => {
        setSessionValid(false);
        setStep("done");
      });
  }, [step, validateContactSession, setLoadingMMessage]);

  useEffect(() => {
    if (step !== "done") {
      return;
    }

    const hasValidSession = sessionValid && contactSessionId;

    setScreen(hasValidSession ? "selection" : "auth");
  }, [sessionValid, contactSessionId, step, setScreen]);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="font-semibold text-3xl">Hi there! 👋</p>
          <p className="font-semibold text-lg">Let's get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4">
        <LoaderIcon className="animate-spin"></LoaderIcon>
        <p className="text-sm text-gray-700">
          {loadingMessage || "Loading..."}
        </p>
      </div>
    </>
  );
};

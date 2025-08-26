"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const {
    isSpeaking,
    isConnecting,
    isConnected,
    transcript,
    startCall,
    endCall,
  } = useVapi();

  return (
    <div className="flex flex-col items-center justify-center min-h-svh max-w-md mx-auto w-full">
      {isConnected ? (
        <Button variant="destructive" onClick={() => endCall()}>
          End Call
        </Button>
      ) : (
        <Button onClick={() => startCall()}>Start Call</Button>
      )}

      <p>{JSON.stringify(transcript)}</p>
    </div>
  );
}

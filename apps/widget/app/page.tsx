"use client";

import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const {
    isConnected,
    isConnecting,
    endCall,
    startCall,
    transcript,
    isSpeaking,
  } = useVapi();

  return (
    <div className="flex flex-col items-center justify-center min-h-svh max-auto w-full">
      <div className="flex gap-2 mb-5">
        {!isConnected ? (
          <Button onClick={() => startCall()}>Start Call</Button>
        ) : (
          <Button variant={"destructive"} onClick={() => endCall()}>
            End Call
          </Button>
        )}
      </div>
      <p>isConnected : {`${isConnected}`} </p>
      <p>isSpeaking : {`${isSpeaking}`} </p>
      <p>isConnecting : {`${isConnecting}`} </p>

      <p>{JSON.stringify(transcript)}</p>
    </div>
  );
}

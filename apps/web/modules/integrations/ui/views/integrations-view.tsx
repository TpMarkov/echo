"use client";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useOrganization } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@workspace/ui/components/separator";
import { IntegrationId, INTEGRATIONS } from "../../constants";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { useState } from "react";
import { createScript } from "../../utils";

export const IntegrationsView = () => {
  const { organization } = useOrganization();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectSnippet, setSelectSnippet] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(organization?.id ?? "");
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error(`Failed to copy to clipboard`);
    }
  };

  const handleIntegrationClick = (integrationId: IntegrationId) => {
    if (!organization) {
      toast.error("Organization ID not found");
      return;
    }

    const snippet = createScript(integrationId, organization.id);
    setSelectSnippet(snippet);
    setDialogOpen(true);
  };

  return (
    <>
      <IntegrationsDialog
        open={dialogOpen}
        snippet={selectSnippet}
        onOpenChange={setDialogOpen}
      />
      <div className="flex min-h-screen flex-col bg-muted p-8">
        <div className="mx-auto w-full max-w-screen-md">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl">Setup & Integrations</h1>
            <p className="text-muted-foreground">
              Choose the integration that's right for you
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <Label className="w-34" htmlFor="organization-id">
                Organization ID
              </Label>
              <Input
                value={organization?.id ?? ""}
                readOnly
                disabled
                className="flex bg-background font-mono text-sm"
              />
              <Button
                className="gap-2"
                onClick={() => handleCopy()}
                size={"sm"}
              >
                <CopyIcon size={4} />
                Copy
              </Button>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="space-y-6">
            <div className="space-y-1">
              <Label className="text-lg">Integrations</Label>
              <p className="text-muted-foreground text-sm">
                Add the following code to your website to enable the chatbox
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
              {INTEGRATIONS.map((integration) => {
                return (
                  <button
                    key={integration.id}
                    onClick={() => handleIntegrationClick(integration.id)}
                    className="flex items-center gap-4 rounded-lg border bg-background p-4 hover:bg-accent"
                  >
                    <Image
                      src={integration.icon}
                      width={32}
                      height={32}
                      alt="integration-logo"
                    ></Image>
                    <p>{integration.title}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const IntegrationsDialog = ({
  open,
  onOpenChange,
  snippet,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  snippet: string;
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error(`Failed to copy to clipboard`);
    }
  };
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Integrate with your website</DialogTitle>
          <DialogDescription>
            Follow this steps to add the chatbox to your website
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="rounded-md bg-accent p-2 text-sm">
              1. Copy the following code
            </div>
            <div className="group relative">
              <pre className="max-h-[300px] overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all rounded-md bg-foreground p-2 font-mono text-secondary text-sm">
                {snippet}
              </pre>
              <Button
                onClick={handleCopy}
                variant="secondary"
                size="icon"
                className="absolute top-4 right-6 size-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <CopyIcon size={3} />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="rounded-md bg-accent p-2 text-sm">
              2. Add the code in your page
            </div>
            <p className="text-muted-foreground text-sm">
              Paste the chatbox code above in your page. You can add it the HTML
              head section.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

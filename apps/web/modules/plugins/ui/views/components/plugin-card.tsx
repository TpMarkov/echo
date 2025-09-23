import { ArrowLeftRightIcon, type LucideIcon, PlugIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";

export interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface PluginCardProps {
  isDisabled?: boolean;
  serviceName: string;
  serviceImage: string;
  features: Feature[];
  onSubmit: () => void;
}

export const PluginCard = ({
  isDisabled,
  serviceName,
  serviceImage,
  features,
  onSubmit,
}: PluginCardProps) => {
  return (
    <div className="h-fit w-full rounded-lg border bg-background p-8">
      <div className="mb-6 flex items-center justify-center gap-6">
        <div className="flex flex-col items-center">
          <Image
            alt={serviceName}
            className="rounded object-contain"
            height={40}
            width={40}
            src={serviceImage}
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <ArrowLeftRightIcon></ArrowLeftRightIcon>
        </div>

        <div className="flex flex-col items-center">
          <Image
            alt="Platform"
            className="rounded object-contain"
            height={40}
            width={40}
            src={"/logo.svg"}
          />
        </div>
      </div>
      <div className="mb-6 text-center">
        <p className="text-lg">Connect your {serviceName} account</p>
      </div>

      <div className="mb-6">
        <div className="space-y-4">
          {features.map((f) => {
            return (
              <div className="flex items-center gap-3" key={f.label}>
                <div className="flex size-8 items-center justify-center rounded-lg border bg-muted">
                  <f.icon className="size-4 bg-muted" />
                </div>
                <div>
                  <div className="font-medium text-sm">{f.label}</div>
                  <div className="font-medium text-xs text-muted-foreground">
                    {f.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center">
        <Button
          className="size-full"
          disabled={isDisabled}
          onClick={onSubmit}
          variant={"default"}
        >
          Connect
          <PlugIcon />
        </Button>
      </div>
    </div>
  );
};

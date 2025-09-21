"use client";

import {
  type LucideIcon,
  BookOpenIcon,
  BotIcon,
  GemIcon,
  GroupIcon,
  MicIcon,
  PaletteIcon,
  PersonStandingIcon,
  PhoneIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";

import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";

interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface PremiumFeatureOverlay {
  children: React.ReactNode;
}

const features: Feature[] = [
  {
    icon: BotIcon,
    label: "AI Customer Support",
    description: "Intelligent automated response 24/7",
  },
  {
    icon: UsersIcon,
    label: "Team Access",
    description: "Up to 5 operators per organization",
  },
  {
    icon: MicIcon,
    label: "AI Voice Agent",
    description: "Natural voice conversations with customers",
  },

  {
    icon: PhoneIcon,
    label: "Phone System",
    description: "Inbound & outbount calling capabilities",
  },
  {
    icon: BookOpenIcon,
    label: "Knowledge base",
    description: "Train AI on your documentation",
  },
  {
    icon: PaletteIcon,
    label: "Widget Customization",
    description: "Customize your chat widget appearance",
  },
];

export const PremiumFeatureOverlay = ({ children }: PremiumFeatureOverlay) => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen">
      {/* Blured bg content */}
      <div className="pointer-events-none select-none blur-[2px]">
        {children}
      </div>
      {/* Overlay */}
      <div className="absolute bg-black/50 inset-0 backdrop-blur-[2px]" />
      {/* Upgrade prompt */}
      <div className="absolute inset-0 z-40 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center">
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted border">
                <GemIcon className="size-6 text-muted-foreground" />
              </div>
            </div>
            <CardTitle className="text-xl">Premium Feauture</CardTitle>
            <CardDescription>
              This feature requires a Pro subscription
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.label} className="flex items-center  gap-3">
                  <div className="flex size-8 items-center rounded-lg justify-center border bg-muted">
                    <feature.icon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="font-me">{feature.label}</p>
                    <p className="text-muted-foreground text-xs">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                router.push("billing");
              }}
            >
              View Plans
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

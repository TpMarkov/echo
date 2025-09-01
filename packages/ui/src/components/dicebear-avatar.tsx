"use client";

import { glass } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

import { useMemo } from "react";
import { Avatar, AvatarImage } from "@workspace/ui/components/avatar";
import { cn } from "../lib/utils";

interface DicebearAvatarProps {
  seed: string;
  size?: number;
  className?: string;
  badgeClassName?: string;
  imageUrl?: string;
  badgeImageUrl?: string;
}

export const DicebearAvatar = ({
  seed,
  size = 32,
  className,
  imageUrl,
  badgeClassName,
  badgeImageUrl,
}: DicebearAvatarProps) => {
  const avatarSrc = useMemo(() => {
    if (imageUrl) return imageUrl;

    const avatar = createAvatar(glass, {
      seed: seed.toLowerCase(),
      size,
    });

    return avatar.toDataUri();
  }, [seed, size, imageUrl]);

  const badgeSize = Math.round(size * 0.5);

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <Avatar
        className={cn("border", className)}
        style={{ width: size, height: size }}
      >
        <AvatarImage alt="avatar" src={avatarSrc} />
      </Avatar>

      {badgeImageUrl && (
        <img
          src={badgeImageUrl}
          alt="badge"
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-background",
            badgeClassName
          )}
          style={{ width: badgeSize, height: badgeSize }}
        />
      )}
    </div>
  );
};

import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react";

interface ConversationStatusProps {
  status: "unresolved" | "resolved" | "escalated";
}

const statusConfig = {
  resolved: {
    icon: CheckIcon,
    bgColor: "bg-[#3FB62F]",
  },
  unresolved: {
    icon: ArrowRightIcon,
    bgColor: "bg-destructive", // Fixed typo: "desctructive" → "destructive"
  },
  escalated: {
    icon: ArrowUpIcon,
    bgColor: "bg-yellow-500",
  },
} as const;

export const ConversationsStatusIcon = ({
  status,
}: ConversationStatusProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center justify-center rounded-full size-6 ${config.bgColor}`}
    >
      <Icon className="size-3 stroke-3 text-white" />
    </div>
  );
};

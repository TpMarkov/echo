import { Doc } from "@workspace/backend/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";
import { Hint } from "@workspace/ui/components/hint";
import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react";

export const ConversationStatusButton = ({
  status,
  disabled,
  onClick,
}: {
  status: Doc<"conversations">["status"];
  disabled: boolean;
  onClick: () => void;
}) => {
  if (status === "resolved") {
    return (
      <Hint text="Mark as unresolved">
        <Button
          onClick={onClick}
          size="sm"
          disabled={disabled}
          variant="tertiary"
        >
          <ArrowUpIcon />
          Resolved
        </Button>
      </Hint>
    );
  }

  if (status === "escalated") {
    return (
      <Hint text="Mark as resolved">
        <Button
          disabled={disabled}
          onClick={onClick}
          size="sm"
          variant="warning"
        >
          <CheckIcon />
          Escalated
        </Button>
      </Hint>
    );
  }

  // status === "unresolved"
  return (
    <Hint text="Mark as escalated">
      <Button
        disabled={disabled}
        onClick={onClick}
        size="sm"
        variant="destructive"
      >
        <ArrowRightIcon />
        Unresolved
      </Button>
    </Hint>
  );
};

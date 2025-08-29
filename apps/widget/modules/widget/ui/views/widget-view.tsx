"use client";

import { WidgetFooter } from "../components/widget-footer";
import { WidgetHeader } from "../components/widget-header";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  return (
    // TODO: Confirm wehere or not min-h-screen and min-w-screen is needed
    <main className="flex h-full w-full min-h-screen flex-col overflow-hidden rounded-xl border bg-muted">
      <WidgetAuthScreen />
      {/* <WidgetFooter /> */}
    </main>
  );
};

// http://localhost:3001/?organizationId=123

"use client";

import { PricingTable as ClerkPricingTable } from "@clerk/nextjs";

export const PricingTable = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4">
      <ClerkPricingTable
        forOrganizations
        appearance={{
          elements: {
            pricingTableCard: "shadow-none! border! border-rouded-lg!",
            pricingTableCardHeader: "bg-background!",
            pricingTableCardBody: "bg-background!",
            pricingTableCardFooter: "bg-background!",
          },
        }}
      />
    </div>
  );
};

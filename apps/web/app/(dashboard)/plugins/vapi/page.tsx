import VapiView from "@/modules/plugins/ui/views/vapi-view";
import React from "react";
import { Protect } from "@clerk/nextjs";
import { PremiumFeatureOverlay } from "@/modules/billing/ui/views/components/premium-feauture-overlay";

const Page = () => {
  return (
    <Protect
      condition={(has) => has({ plan: "pro" })}
      fallback={
        <PremiumFeatureOverlay>
          <VapiView />
        </PremiumFeatureOverlay>
      }
    >
      <VapiView />
    </Protect>
  );
};

export default Page;

import { CustomizationView } from "@/modules/customization/ui/views/customization-view";
import React from "react";
import { PremiumFeatureOverlay } from "@/modules/billing/ui/views/components/premium-feauture-overlay";
import { Protect } from "@clerk/nextjs";

const Page = () => {
  return (
    <Protect
      condition={(has) => has({ plan: "pro" })}
      fallback={
        <PremiumFeatureOverlay>
          <CustomizationView />
        </PremiumFeatureOverlay>
      }
    >
      <CustomizationView />
    </Protect>
  );
};

export default Page;

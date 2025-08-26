import { OrganizationList } from "@clerk/nextjs";

export const OrgSelectView = () => {
  return (
    <div>
      <OrganizationList
        afterCreateOrganizationUrl={"/"}
        afterSelectPersonalUrl={"/"}
        hidePersonal
        skipInvitationScreen
      />
    </div>
  );
};

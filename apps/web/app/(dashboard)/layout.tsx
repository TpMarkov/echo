import { DashboardLayout } from "@/modules/dashboard/layouts/dashboard-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;

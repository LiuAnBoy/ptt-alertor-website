import { Metadata } from "next";

import SettingsContent from "@/shared/components/settings/SettingsContent";

export const metadata: Metadata = {
  title: "PTT Alertor | 訂閱管理",
  description: "PTT Alertor 訂閱與綁定管理",
};

export default function SubscriptionsPage() {
  return <SettingsContent />;
}

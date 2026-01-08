import { Metadata } from "next";

import SettingsContent from "@/shared/components/settings/SettingsContent";

export const metadata: Metadata = {
  title: "PTT Alertor | 設定",
  description: "PTT Alertor 訂閱與綁定設定",
};

export default function SettingsPage() {
  return <SettingsContent />;
}

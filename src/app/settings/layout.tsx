import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "PTT Alertor | 設定",
  description: "PTT Alertor 訂閱與綁定設定",
};

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return children;
}

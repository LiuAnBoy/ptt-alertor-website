import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "PTT Alertor | 登入",
  description: "登入 PTT Alertor",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}

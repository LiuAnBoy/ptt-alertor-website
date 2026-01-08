import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "PTT Alertor | 註冊",
  description: "註冊 PTT Alertor",
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return children;
}

export const dynamic = "force-dynamic";
import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "재산분할 법원 비율 기준: 판정 비율 및 분할 기준 | 머니위키",
  description: "법원에서 재산분할 비율을 어떻게 정하는지 기준과 원칙을 알려드려요. 맞벌이는 5:5, 전업주부도 4-5:5 비율로 받을 수 있어요.",
  openGraph: { title: "재산분할 법원 비율 기준: 판정 비율 및 분할 기준", description: "법원에서 재산분할 비율을 어떻게 정하는지 기준과 원칙을 알려드려요. 맞벌이는 5:5, 전업주부도 4-5:5 비율로 받을 수 있어요.", url: "https://jjyu.co.kr/w/재산분할-법원-비율-기준" },
  alternates: { canonical: "https://jjyu.co.kr/w/재산분할-법원-비율-기준" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

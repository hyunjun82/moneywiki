import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "채무자 명예퇴직수당 가압류 가능 여부 및 압류 범위 | 머니위키",
  description: "명예퇴직수당에 가압류 걸 수 있는지, 얼마나 압류 가능한지 알려드려요.",
  openGraph: { title: "채무자 명예퇴직수당 가압류 가능 여부 및 압류 범위", description: "명예퇴직수당에 가압류 걸 수 있는지, 얼마나 압류 가능한지 알려드려요.", url: "https://jjyu.co.kr/w/채무자-명예퇴직수당-가압류-가능" },
  alternates: { canonical: "https://jjyu.co.kr/w/채무자-명예퇴직수당-가압류-가능" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "근로자의 날 당연유급 제외대상 | 머니위키",
  description: "근로자의 날에 당연유급이 아닌 경우가 있나요? 5인 미만 사업장, 관리감독자 등 제외대상을 알려드릴게요.",
  openGraph: { title: "근로자의 날 당연유급 제외대상", description: "근로자의 날에 당연유급이 아닌 경우가 있나요? 5인 미만 사업장, 관리감독자 등 제외대상을 알려드릴게요.", url: "https://jjyu.co.kr/w/근로자의날-당연유급-제외대상" },
  alternates: { canonical: "https://jjyu.co.kr/w/근로자의날-당연유급-제외대상" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

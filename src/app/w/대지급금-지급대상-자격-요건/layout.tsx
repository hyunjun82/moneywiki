import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "회사가 망해서 월급을 못 받았다면? 대지급금 지급 대상과 신청 방법 | 머니위키",
  description: "사업주 부도·파산 시 체불임금을 정부가 대신 지급하는 대지급금 제도예요. 최대 1,000만원까지 받아요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대지급금-지급대상-자격-요건" },
  openGraph: { title: "회사가 망해서 월급을 못 받았다면? 대지급금 지급 대상과 신청 방법 | 머니위키", description: "사업주 부도·파산 시 체불임금을 정부가 대신 지급하는 대지급금 제도예요. 최대 1,000만원까지 받아요.", url: "https://www.jjyu.co.kr/w/대지급금-지급대상-자격-요건", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

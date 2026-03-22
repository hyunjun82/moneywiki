import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전세 이사할 때 관리비 정산은 어떻게 하나요? 관리비 반환 기준과 절차 | 머니위키",
  description: "이사 시 관리비 선납분은 일할 계산해서 돌려받아요. 장기수선충당금도 반환 대상이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세-아파트-관리비-반환-이사" },
  openGraph: { title: "전세 이사할 때 관리비 정산은 어떻게 하나요? 관리비 반환 기준과 절차 | 머니위키", description: "이사 시 관리비 선납분은 일할 계산해서 돌려받아요. 장기수선충당금도 반환 대상이에요.", url: "https://www.jjyu.co.kr/w/전세-아파트-관리비-반환-이사", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

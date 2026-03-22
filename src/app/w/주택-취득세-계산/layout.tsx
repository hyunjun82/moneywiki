import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "집 살 때 취득세가 얼마나 나오나요? 주택 취득세 세율과 계산 | 머니위키",
  description: "6억 이하 1주택은 1%, 9억 초과 3%. 다주택자는 중과세율 적용돼요. 취득세 계산법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택-취득세-계산" },
  openGraph: { title: "집 살 때 취득세가 얼마나 나오나요? 주택 취득세 세율과 계산 | 머니위키", description: "6억 이하 1주택은 1%, 9억 초과 3%. 다주택자는 중과세율 적용돼요. 취득세 계산법을 정리했어요.", url: "https://www.jjyu.co.kr/w/주택-취득세-계산", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

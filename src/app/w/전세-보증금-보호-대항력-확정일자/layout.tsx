import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전세 보증금, 어떻게 지켜야 하나요? 대항력과 확정일자 완벽 가이드 | 머니위키",
  description: "대항력(전입+점유)과 확정일자를 모두 갖추면 보증금이 보호돼요. 단계별 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세-보증금-보호-대항력-확정일자" },
  openGraph: { title: "전세 보증금, 어떻게 지켜야 하나요? 대항력과 확정일자 완벽 가이드 | 머니위키", description: "대항력(전입+점유)과 확정일자를 모두 갖추면 보증금이 보호돼요. 단계별 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/전세-보증금-보호-대항력-확정일자", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

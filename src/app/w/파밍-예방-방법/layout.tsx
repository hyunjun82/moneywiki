import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "파밍 예방, 이것만 지키세요 — 피해 시 대처법과 신고 방법 | 머니위키",
  description: "정상 주소 입력해도 가짜 사이트로 연결되는 파밍, 예방 수칙 7가지와 피해 시 신고(112·1332)·지급정지·환급 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/파밍-예방-방법" },
  openGraph: {
    title: "파밍 예방, 이것만 지키세요 — 피해 시 대처법과 신고 방법 | 머니위키",
    description: "정상 주소 입력해도 가짜 사이트로 연결되는 파밍, 예방 수칙 7가지와 피해 시 신고(112·1332)·지급정지·환급 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/파밍-예방-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

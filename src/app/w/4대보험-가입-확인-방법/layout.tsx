import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "4대보험 가입 확인 방법 — 조회·미가입 신고·증명서 발급 | 머니위키",
  description: "정부24·4대사회보험 사이트에서 30초 내 가입 여부를 확인해요. 미가입이면 노동청 신고로 2주 내 조사 시작, 소급 가입까지 받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/4대보험-가입-확인-방법" },
  openGraph: {
    title: "4대보험 가입 확인 방법 — 조회·미가입 신고·증명서 발급 | 머니위키",
    description: "정부24·4대사회보험 사이트에서 30초 내 가입 여부를 확인해요. 미가입이면 노동청 신고로 2주 내 조사 시작, 소급 가입까지 받을 수 있어요.",
    url: "https://www.jjyu.co.kr/w/4대보험-가입-확인-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

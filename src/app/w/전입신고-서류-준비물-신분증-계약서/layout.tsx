import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전입신고 서류 준비물 — 신분증·계약서·위임장 상황별 정리",
  description: "본인 직접은 신분증 원본만, 대리인이면 위임장+도장+대리인 신분증 필요해요. 확정일자까지 받으려면 임대차계약서 원본도 챙기세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전입신고-서류-준비물-신분증-계약서" },
  openGraph: {
    title: "전입신고 서류 준비물 — 신분증·계약서·위임장 상황별 정리 | 머니위키",
    description: "본인 직접은 신분증 원본만, 대리인이면 위임장+도장+대리인 신분증 필요해요. 확정일자까지 받으려면 임대차계약서 원본도 챙기세요.",
    url: "https://www.jjyu.co.kr/w/전입신고-서류-준비물-신분증-계약서",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

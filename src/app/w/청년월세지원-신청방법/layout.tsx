import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "청년월세지원 신청방법 — 복지로 온라인 접수 절차",
  description: "청년월세지원 신청은 복지로(bokjiro.go.kr) 또는 행정복지센터에서 해요. 서류 준비부터 신청 완료까지 4단계를 순서대로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년월세지원-신청방법" },
  openGraph: {
    title: "청년월세지원 신청방법 — 복지로 온라인 접수 절차 | 머니위키",
    description: "청년월세지원 신청은 복지로(bokjiro.go.kr) 또는 행정복지센터에서 해요. 서류 준비부터 신청 완료까지 4단계를 순서대로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/청년월세지원-신청방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

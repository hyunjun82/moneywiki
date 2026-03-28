import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "햇살론유스 자격 조건 | 한도와 신청 방법 대학생·취준생 기준",
  description: "햇살론유스 자격 조건 | 한도와 신청 방법 대학생·취준생 기준 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/햇살론유스-자격조건",
  },
  openGraph: {
    title: "햇살론유스 자격 조건 | 한도와 신청 방법 대학생·취준생 기준",
    description: "햇살론유스 자격 조건 | 한도와 신청 방법 대학생·취준생 기준 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/햇살론유스-자격조건",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "오래된 가압류 해제 방법 | 소멸시효·취소 신청 절차",
  description: "오래된 가압류 해제 방법 | 소멸시효·취소 신청 절차 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/오래된-가압류-해제",
  },
  openGraph: {
    title: "오래된 가압류 해제 방법 | 소멸시효·취소 신청 절차",
    description: "오래된 가압류 해제 방법 | 소멸시효·취소 신청 절차 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/오래된-가압류-해제",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 위자료 청구 | 금액 기준과 소멸시효 확인",
  description: "이혼 위자료 청구 | 금액 기준과 소멸시효 확인 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/이혼-위자료-청구",
  },
  openGraph: {
    title: "이혼 위자료 청구 | 금액 기준과 소멸시효 확인",
    description: "이혼 위자료 청구 | 금액 기준과 소멸시효 확인 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/이혼-위자료-청구",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

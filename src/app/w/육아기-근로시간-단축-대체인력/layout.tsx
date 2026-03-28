import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "육아기 근로시간 단축 대체인력 | 육아휴직과 차이점",
  description: "육아기 근로시간 단축 대체인력 | 육아휴직과 차이점 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/육아기-근로시간-단축-대체인력",
  },
  openGraph: {
    title: "육아기 근로시간 단축 대체인력 | 육아휴직과 차이점",
    description: "육아기 근로시간 단축 대체인력 | 육아휴직과 차이점 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/육아기-근로시간-단축-대체인력",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "근로계약서 작성 방법 | 필수 기재사항과 못 받았을 때 대처법",
  description: "근로계약서 작성 방법 | 필수 기재사항과 못 받았을 때 대처법 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/근로계약서-작성-방법",
  },
  openGraph: {
    title: "근로계약서 작성 방법 | 필수 기재사항과 못 받았을 때 대처법",
    description: "근로계약서 작성 방법 | 필수 기재사항과 못 받았을 때 대처법 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/근로계약서-작성-방법",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

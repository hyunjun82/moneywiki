import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "파견 vs 직고용 대체인력 | 어느 쪽이 지원금에 유리한가",
  description: "파견 vs 직고용 대체인력 | 어느 쪽이 지원금에 유리한가 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/파견-직고용-대체인력",
  },
  openGraph: {
    title: "파견 vs 직고용 대체인력 | 어느 쪽이 지원금에 유리한가",
    description: "파견 vs 직고용 대체인력 | 어느 쪽이 지원금에 유리한가 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/파견-직고용-대체인력",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

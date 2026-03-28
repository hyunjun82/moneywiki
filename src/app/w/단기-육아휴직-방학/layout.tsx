import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "단기 육아휴직 신청 방법 | 2026년 방학 활용 제도",
  description: "단기 육아휴직 신청 방법 | 2026년 방학 활용 제도 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/단기-육아휴직-방학",
  },
  openGraph: {
    title: "단기 육아휴직 신청 방법 | 2026년 방학 활용 제도",
    description: "단기 육아휴직 신청 방법 | 2026년 방학 활용 제도 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/단기-육아휴직-방학",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

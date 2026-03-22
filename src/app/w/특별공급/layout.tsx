import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "특별공급, 나도 해당될까? 유형별 자격 조건과 신청 방법 | 머니위키",
  description: "신혼부부·생애최초·다자녀·노부모·기관추천 5개 유형별 자격, 소득 기준, 2026년 변경사항을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/특별공급" },
  openGraph: {
    title: "특별공급, 나도 해당될까? 유형별 자격 조건과 신청 방법 | 머니위키",
    description: "신혼부부·생애최초·다자녀·노부모·기관추천 5개 유형별 자격, 소득 기준, 2026년 변경사항을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/특별공급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

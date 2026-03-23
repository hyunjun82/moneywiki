import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "농지 임대차 이용정보 변경신청 — 60일 기한과 과태료, 신청 방법 | 머니위키",
  description: "농지 임대차 계약 후 60일 이내에 이용정보 변경신청을 해야 해요. 미신고 시 300만원 과태료. 필요 서류와 온라인 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농지-임대차-변경신청" },
  openGraph: {
    title: "농지 임대차 이용정보 변경신청 — 60일 기한과 과태료, 신청 방법 | 머니위키",
    description: "농지 임대차 계약 후 60일 이내에 이용정보 변경신청을 해야 해요. 미신고 시 300만원 과태료.",
    url: "https://www.jjyu.co.kr/w/농지-임대차-변경신청",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

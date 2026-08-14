import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "배달기사 구직급여 — 전속 기사 고용보험과 신청 방법",
  description: "배달앱 전속 기사는 고용보험이 적용돼서 구직급여를 받을 수 있어요. 자격 조건, 전속·비전속 차이, 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/배달앱-플랫폼-전속-배달기사-구직급여" },
  openGraph: {
    title: "배달기사 구직급여 — 전속 기사 고용보험과 신청 방법",
    description: "고용보험 가입 여부 확인부터 구직급여 신청까지.",
    url: "https://www.jjyu.co.kr/w/배달앱-플랫폼-전속-배달기사-구직급여",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

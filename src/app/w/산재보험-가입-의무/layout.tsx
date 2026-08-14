import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "산재보험 가입 의무 대상, 신고 방법부터 미가입 과태료까지",
  description: "근로자 1명 이상 고용하면 산재보험 의무 가입 대상이에요. 14일 내 온라인 신고 방법과 미가입 시 과태료 300만원, 보험급여 50% 추가 부담까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/산재보험-가입-의무" },
  openGraph: {
    title: "산재보험 가입 의무 대상, 신고 방법부터 미가입 과태료까지 | 머니위키",
    description: "근로자 1명 이상 고용하면 산재보험 의무 가입 대상이에요. 14일 내 온라인 신고 방법과 미가입 시 과태료 300만원, 보험급여 50% 추가 부담까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/산재보험-가입-의무",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

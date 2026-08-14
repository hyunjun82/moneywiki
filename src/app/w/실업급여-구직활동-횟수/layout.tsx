import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "구직활동 몇 번 해야 할까? 차수별 인정 기준과 방법",
  description: "실업급여 구직활동은 1~3차 1회, 4차부터 2회 이상 필요해요. 온라인 입사지원, 면접, 직업훈련 등 인정되는 활동과 주의사항을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-구직활동-횟수" },
  openGraph: {
    title: "구직활동 몇 번 해야 할까? 차수별 인정 기준과 방법 | 머니위키",
    description: "실업급여 구직활동은 1~3차 1회, 4차부터 2회 이상 필요해요. 온라인 입사지원, 면접, 직업훈련 등 인정되는 활동과 주의사항을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-구직활동-횟수",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "재개발 조합 총회, 조합원이 직접 열 수 있을까? 소집 요건과 절차 | 머니위키",
  description: "재개발 조합 총회는 조합원 5분의 1 이상이 요구하면 소집돼요. 2주 미응시 직접 소집 가능하고, 의결은 과반수 출석 과반수 찬성이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택재개발-조합-총회-소집-요건" },
  openGraph: {
    title: "재개발 조합 총회, 조합원이 직접 열 수 있을까? 소집 요건과 절차 | 머니위키",
    description: "조합원 5분의 1 이상 요구 시 총회 소집 의무가 생겨요. 소집 요건, 의결 정족수, 직접 소집 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/주택재개발-조합-총회-소집-요건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

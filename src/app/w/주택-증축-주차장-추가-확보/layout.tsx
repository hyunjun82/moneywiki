import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주택 증축하면 주차장도 더 만들어야 할까? 설치 기준과 면제 조건 | 머니위키",
  description: "주택 증축 시 세대당 1대(60㎡ 이하 0.7대) 주차장 확보가 필요해요. 사용승인 후 5년 경과 1천㎡ 미만이면 일부 면제 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택-증축-주차장-추가-확보" },
  openGraph: {
    title: "주택 증축하면 주차장도 더 만들어야 할까? 설치 기준과 면제 조건 | 머니위키",
    description: "증축 시 주차대수 기준, 면제 조건, 지자체 조례 확인 방법을 한 글에 정리했어요.",
    url: "https://www.jjyu.co.kr/w/주택-증축-주차장-추가-확보",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

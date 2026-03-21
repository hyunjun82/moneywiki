import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "일조권 확보 주택 높이 제한 기준과 대응 방법 | 머니위키",
  description: "건축법 일조 확보 기준, 정북방향 이격거리, 대법원 일조권 침해 판단 기준, 손해배상 청구 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/일조-확보-주택-높이-제한-기준" },
  openGraph: {
    title: "일조권 확보 주택 높이 제한 기준과 대응 방법 | 머니위키",
    description: "건축법 일조 확보 기준, 정북방향 이격거리, 대법원 일조권 침해 판단 기준을 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/일조-확보-주택-높이-제한-기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

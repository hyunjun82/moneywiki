import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경차 유류세 잘못 환급받으면? 부정사용 제재 기준 | 머니위키",
  description: "경차사랑카드 부정사용 시 환급세액 전액 징수 + 40% 가산세가 부과돼요. 48리터 초과, 카드 대여 등 부정환급 유형과 올바른 사용법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/경형자동차-유류세-부정환급-제재",
  },
  openGraph: {
    title: "경차 유류세 잘못 환급받으면? 부정사용 제재 기준",
    description: "환급세액 전액 징수 + 40% 가산세. 부정사용 유형과 안전한 사용법.",
    url: "https://www.jjyu.co.kr/w/경형자동차-유류세-부정환급-제재",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

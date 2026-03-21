import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "상속세 계산 세율 공제, 배우자·자녀 공제 한도 정리 | 머니위키",
  description: "상속세 세율 10~50% 구간표, 배우자 최대 30억·자녀 1인당 5억 공제, 일괄공제 5억 선택 방법, 신고 기한 6개월까지 한 번에 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/상속세-계산-세율-공제" },
  openGraph: {
    title: "상속세 계산 세율 공제, 배우자·자녀 공제 한도 정리 | 머니위키",
    description: "상속세 세율 10~50% 구간표, 배우자 최대 30억·자녀 1인당 5억 공제, 일괄공제 5억 선택 방법, 신고 기한 6개월까지 한 번에 정리했어요.",
    url: "https://www.jjyu.co.kr/w/상속세-계산-세율-공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

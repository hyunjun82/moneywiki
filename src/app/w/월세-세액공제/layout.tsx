import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "월세 세액공제, 얼마 돌려받나요? 조건·공제율·신청 방법까지 | 머니위키",
  description: "무주택 세대주라면 월세액의 15~17%를 세금에서 돌려받을 수 있어요. 조건, 공제율, 연말정산 신청 방법을 정리했어요. 임대인 동의 없이도 신청 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/월세-세액공제" },
  openGraph: {
    title: "월세 세액공제, 얼마 돌려받나요? 조건·공제율·신청 방법까지 | 머니위키",
    description: "무주택 세대주라면 월세액의 15~17%를 세금에서 돌려받을 수 있어요. 조건, 공제율, 연말정산 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/월세-세액공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

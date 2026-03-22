import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 실손보험금 차감, 의료비 공제 주의사항 | 머니위키",
  description: "실손보험금으로 받은 금액은 의료비 공제에서 빼야 해요. 2023년부터 간소화 자동 반영되지만 확인 필수. 과다공제 시 추징과 가산세를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-실손보험금",
  },
  openGraph: {
    title: "연말정산 실손보험금 차감, 의료비 공제 주의사항",
    description: "실손보험금은 의료비에서 차감 필수. 과다공제 추징 + 가산세 10% 주의.",
    url: "https://www.jjyu.co.kr/w/연말정산-실손보험금",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

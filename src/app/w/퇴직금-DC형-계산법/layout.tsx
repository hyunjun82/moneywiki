import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "DC형 퇴직금 계산법, DB형이랑 뭐가 다른가요? | 머니위키",
  description: "DC형 퇴직금은 회사가 매년 연봉의 1/12를 적립하고 근로자가 운용해요. DB형과의 차이, 운용 손실 리스크, 적립금 확인 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-DC형-계산법" },
  openGraph: {
    title: "DC형 퇴직금 계산법, DB형이랑 뭐가 다른가요? | 머니위키",
    description: "DC형 퇴직금은 회사가 매년 연봉의 1/12를 적립하고 근로자가 운용해요. DB형과의 차이, 운용 손실 리스크, 적립금 확인 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-DC형-계산법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "DC형 퇴직금 수령 방법, 적립금 확인부터 수령까지 | 머니위키",
  description: "DC형 퇴직연금 수령 방법과 적립금 확인 방법을 정리했어요. 운용 손실 시 수령액 변동, 세금 처리까지 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/dc형-퇴직금-수령방법" },
  openGraph: {
    title: "DC형 퇴직금 수령 방법, 적립금 확인부터 수령까지 | 머니위키",
    description: "DC형 퇴직연금 수령 방법과 적립금 확인 방법을 정리했어요. 운용 손실 시 수령액 변동, 세금 처리까지 안내해요.",
    url: "https://www.jjyu.co.kr/w/dc형-퇴직금-수령방법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매 매각허가결정 이의신청, 7일 놓치면 끝? 절차와 비용 | 머니위키",
  description: "경매 매각허가결정에 문제가 있으면 7일 이내에 이의신청해야 해요. 사법보좌관 결정은 이의신청, 판사 결정은 즉시항고로 불복하는 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/경매-매각허가결정-이의신청-절차" },
  openGraph: {
    title: "경매 매각허가결정 이의신청, 7일 놓치면 끝? 절차와 비용 | 머니위키",
    description: "경매 매각허가결정에 문제가 있으면 7일 이내에 이의신청해야 해요. 사법보좌관 결정은 이의신청, 판사 결정은 즉시항고로 불복하는 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/경매-매각허가결정-이의신청-절차",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

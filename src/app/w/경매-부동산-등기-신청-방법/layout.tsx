import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매 부동산 등기 신청 방법, 법원이 촉탁해줘서 직접 안 해도 돼요 | 머니위키",
  description: "경매로 낙찰받은 부동산 등기는 법원이 직접 촉탁해줘요. 매수인이 할 일은 서류 제출뿐이에요. 취득세 납부 순서와 등기 확인 방법까지 정리했어요.",
  openGraph: {
    title: "경매 부동산 등기 신청 방법, 법원이 촉탁해줘서 직접 안 해도 돼요 | 머니위키",
    description: "경매로 낙찰받은 부동산 등기는 법원이 직접 촉탁해줘요. 매수인이 할 일은 서류 제출뿐이에요.",
    url: "https://www.jjyu.co.kr/w/경매-부동산-등기-신청-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/경매-부동산-등기-신청-방법" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

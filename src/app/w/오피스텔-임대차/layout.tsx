import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "오피스텔 임대차보호법 적용 조건과 대항력 확보법 | 머니위키",
  description: "오피스텔도 주거용이면 임대차보호법이 적용돼요. 전입신고와 확정일자로 대항력을 확보하는 방법을 정리했어요.",
  openGraph: {
    title: "오피스텔 임대차보호법 적용 조건과 대항력 확보법 | 머니위키",
    description: "오피스텔 주거용 판단 기준과 대항력 확보 방법이에요.",
    url: "https://www.jjyu.co.kr/w/오피스텔-임대차",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/오피스텔-임대차" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

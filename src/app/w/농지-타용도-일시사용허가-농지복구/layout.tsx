import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "농지 타용도 일시사용허가 농지복구 의무 | 머니위키",
  description: "농지를 잠깐 다른 용도로 쓰려고 하시나요? 복구 의무와 예치금, 위반 시 제재까지 꼭 알아야 해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농지-타용도-일시사용허가-농지복구" },
  openGraph: { title: "농지 타용도 일시사용허가 농지복구 의무 | 머니위키", description: "농지를 잠깐 다른 용도로 쓰려고 하시나요? 복구 의무와 예치금, 위반 시 제재까지 꼭 알아야 해요.", url: "https://www.jjyu.co.kr/w/농지-타용도-일시사용허가-농지복구", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

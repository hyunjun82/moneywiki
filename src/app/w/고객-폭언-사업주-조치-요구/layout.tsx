import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고객 폭언 사업주 조치 요구 방법 처벌 기준 | 머니위키",
  description: "고객 폭언 시 사업주에게 조치를 요구할 수 있어요. 산업안전보건법 제41조 기준, 미이행 시 1천만원 과태료, 불이익 시 3년 징역.",
  openGraph: {
    title: "고객 폭언 사업주 조치 요구 방법 처벌 기준",
    description: "사업주 조치 의무와 미이행 시 과태료·벌금 기준.",
    url: "https://jjyu.co.kr/w/고객-폭언-사업주-조치-요구",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/고객-폭언-사업주-조치-요구" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "고객 성희롱 사업주 조치·보호의무·신고 방법 | 머니위키",
  description: "고객에 의한 성희롱 발생 시 사업주가 취해야 할 조치가 법으로 정해져 있어요. 보호의무 위반 시 과태료 대상이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/고객-성희롱-사업주-조치" },
  openGraph: {
    title: "고객 성희롱 사업주 조치·보호의무·신고 방법",
    description: "고객에 의한 성희롱 발생 시 사업주가 취해야 할 조치가 법으로 정해져 있어요. 보호의무 위반 시 과태료 대상이에요.",
    url: "https://www.jjyu.co.kr/w/고객-성희롱-사업주-조치",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

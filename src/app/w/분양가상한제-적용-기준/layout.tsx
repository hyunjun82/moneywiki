import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "분양가상한제 적용 기준과 제외 주택 조건 | 머니위키",
  description: "분양가상한제가 적용되는 공공택지·민간택지 기준, 제외 주택 4가지, 적용 여부 확인 방법까지 주택법 기준으로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/분양가상한제-적용-기준" },
  openGraph: {
    title: "분양가상한제 적용 기준과 제외 주택 조건 | 머니위키",
    description: "분양가상한제가 적용되는 공공택지·민간택지 기준, 제외 주택 4가지, 적용 여부 확인 방법까지 주택법 기준으로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/분양가상한제-적용-기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "중개보조원 피해 임대인 책임 여부 | 머니위키",
  description: "전세 계약 권한 없는 중개보조원 때문에 피해 봤는데, 임대인에게도 책임을 물을 수 있는지 알려드릴게요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/중개보조원-피해-임대인-책임" },
  openGraph: {
    title: "중개보조원 피해 임대인 책임 여부",
    description: "전세 계약 권한 없는 중개보조원 때문에 피해 봤는데, 임대인에게도 책임을 물을 수 있는지 알려드릴게요.",
    url: "https://www.jjyu.co.kr/w/중개보조원-피해-임대인-책임",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

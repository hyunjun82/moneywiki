import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "직장어린이집 이용료, 세금 안 내도 돼요 보육수당과 별개로 비과세 | 머니위키",
  description: "직장어린이집 이용료는 한도 없이 전액 비과세예요. 보육수당 월 20만원과 별개로 적용되고, 둘 다 받으면 둘 다 비과세돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-직장어린이집-비과세",
  },
  openGraph: {
    title: "직장어린이집 이용료, 세금 안 내도 돼요 보육수당과 별개로 비과세",
    description: "직장어린이집 한도 없이 비과세. 보육수당 월 20만원과 별개 적용.",
    url: "https://www.jjyu.co.kr/w/연말정산-직장어린이집-비과세",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

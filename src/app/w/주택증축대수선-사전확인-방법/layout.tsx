import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주택 증축·대수선, 허가 전에 미리 확인하는 방법 | 머니위키",
  description: "토지이용계획확인원으로 용도지역·건폐율·용적률을 확인하고, 건축법 사전결정 제도로 증축 가능 규모를 미리 알 수 있어요. 사전결정 효력은 2년이에요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/주택증축대수선-사전확인-방법",
  },
  openGraph: {
    title: "주택 증축·대수선, 허가 전에 미리 확인하는 방법",
    description: "토지이용계획확인 + 사전결정 제도로 허가 가능 여부를 미리 확인.",
    url: "https://www.jjyu.co.kr/w/주택증축대수선-사전확인-방법",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

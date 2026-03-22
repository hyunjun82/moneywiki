import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "체크카드 한도, 왜 막히고 어떻게 올릴까? 기본 한도와 변경 방법 | 머니위키",
  description: "체크카드 기본 한도는 일 600만원, 월 1,000만원이에요. 앱에서 3분이면 한도를 올릴 수 있고, 최대 1억원까지 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/체크카드-한도" },
  openGraph: {
    title: "체크카드 한도, 왜 막히고 어떻게 올릴까? 기본 한도와 변경 방법 | 머니위키",
    description: "체크카드 기본 한도는 일 600만원, 월 1,000만원이에요. 앱에서 3분이면 한도를 올릴 수 있어요.",
    url: "https://www.jjyu.co.kr/w/체크카드-한도",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

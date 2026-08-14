import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부동산등기부 열람·발급 방법 인터넷등기소",
  description: "인터넷등기소에서 열람 700원, 발급 1,000원으로 집에서 바로 뗄 수 있어요. 소유자·압류·근저당권 확인 포인트까지 5단계로 설명해드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/부동산등기부-열람-발급-방법-인터넷등기소" },
  openGraph: {
    title: "부동산등기부 열람·발급 방법 인터넷등기소 | 머니위키",
    description: "인터넷등기소에서 열람 700원, 발급 1,000원으로 집에서 바로 뗄 수 있어요. 소유자·압류·근저당권 확인 포인트까지 5단계로 설명해드려요.",
    url: "https://www.jjyu.co.kr/w/부동산등기부-열람-발급-방법-인터넷등기소",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

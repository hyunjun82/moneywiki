import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "인지세 세율과 납부 방법, 부동산·대출 계약서 기준",
  description: "부동산 매매계약서 1억~10억은 15만원, 10억 초과는 35만원이에요. 전세·월세는 비과세예요. 전자수입인지 납부 방법과 미납 시 3배 과태료까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/인지세" },
  openGraph: {
    title: "인지세 세율과 납부 방법, 부동산·대출 계약서 기준 | 머니위키",
    description: "부동산 매매계약서 1억~10억은 15만원, 10억 초과는 35만원이에요. 전세·월세는 비과세예요. 전자수입인지 납부 방법과 미납 시 3배 과태료까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/인지세",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

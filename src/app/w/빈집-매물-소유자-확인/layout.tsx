import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "마음에 드는 빈집, 주인은 누구? 소유자 확인하는 방법",
  description: "빈집 소유자를 찾으려면 빈집플랫폼, 등기부등본, 토지대장을 활용하세요. 2026년부터 행정정보 연계가 확대돼서 소유자 파악이 더 쉬워졌어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/빈집-매물-소유자-확인" },
  openGraph: {
    title: "마음에 드는 빈집, 주인은 누구? 소유자 확인하는 방법 | 머니위키",
    description: "빈집 소유자를 찾으려면 빈집플랫폼, 등기부등본, 토지대장을 활용하세요. 2026년부터 행정정보 연계가 확대돼서 소유자 파악이 더 쉬워졌어요.",
    url: "https://www.jjyu.co.kr/w/빈집-매물-소유자-확인",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "유류세 탄력세율, 기름값 얼마나 싸지나? 인하율과 적용 기간 | 머니위키",
  description: "2026년 유류세 탄력세율 인하로 휘발유 리터당 57원, 경유 58원이 싸져요. 인하율, 적용 기간, 법적 근거까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/유류세-탄력세율-적용-방법" },
  openGraph: {
    title: "유류세 탄력세율, 기름값 얼마나 싸지나? 인하율과 적용 기간 | 머니위키",
    description: "2026년 유류세 탄력세율 인하로 휘발유 리터당 57원, 경유 58원이 싸져요. 인하율, 적용 기간, 법적 근거까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/유류세-탄력세율-적용-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

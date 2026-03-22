import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매 낙찰받았는데 전 주인이 안 나가요 인도명령과 명도소송 기한·절차 | 머니위키",
  description: "경매 낙찰 후 점유자가 안 나가면 대금납부 6개월 이내 인도명령을 신청하세요. 2~3주면 결정, 1~2개월이면 강제퇴거 가능해요. 인도명령과 명도소송 차이, 비용, 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/경매-낙찰-점유자-인도명령-명도소송",
  },
  openGraph: {
    title: "경매 낙찰받았는데 전 주인이 안 나가요 인도명령과 명도소송 기한·절차",
    description: "대금납부 6개월 내 인도명령 신청. 2~3주 결정. 명도소송과 비교 정리.",
    url: "https://www.jjyu.co.kr/w/경매-낙찰-점유자-인도명령-명도소송",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

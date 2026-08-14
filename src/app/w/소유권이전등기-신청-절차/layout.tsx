import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "소유권이전등기 신청 절차, 서류부터 셀프등기까지 비용 비교",
  description: "집 샀는데 등기이전을 어떻게 해야 할지 모르겠죠. 잔금일로부터 60일 기한, 필요 서류, 셀프등기 방법과 비용까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/소유권이전등기-신청-절차" },
  openGraph: {
    title: "소유권이전등기 신청 절차, 서류부터 셀프등기까지 비용 비교 | 머니위키",
    description: "집 샀는데 등기이전을 어떻게 해야 할지 모르겠죠. 잔금일로부터 60일 기한, 필요 서류, 셀프등기 방법과 비용까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/소유권이전등기-신청-절차",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

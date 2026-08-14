import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고시원을 호스텔로 바꾸려면? 용도변경 절차와 필요 서류",
  description: "500㎡ 미만 고시원과 호스텔은 같은 영업시설군이라 건축물대장 변경 신청만 하면 돼요. 수수료 몇만 원, 처리 기간 약 2주, 관광숙박업 신고까지 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/고시원-호스텔-용도변경",
  },
  openGraph: {
    title: "고시원을 호스텔로 바꾸려면? 용도변경 절차와 필요 서류",
    description: "같은 영업시설군이라 건축물대장 변경만 하면 돼요. 절차, 서류, 비용 정리.",
    url: "https://www.jjyu.co.kr/w/고시원-호스텔-용도변경",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

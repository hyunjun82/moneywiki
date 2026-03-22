import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "확정일자, 주민센터 안 가고 받을 수 있나? 인터넷 발급과 효력 시점 | 머니위키",
  description: "전월세신고하면 확정일자 무료 자동 부여. 인터넷 발급 방법, 효력 발생 시점(전입신고 다음날 0시), 전입신고와의 차이를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/확정일자-인터넷-발급" },
  openGraph: {
    title: "확정일자, 주민센터 안 가고 받을 수 있나? 인터넷 발급과 효력 시점 | 머니위키",
    description: "전월세신고하면 확정일자 무료 자동 부여. 인터넷 발급 방법, 효력 발생 시점(전입신고 다음날 0시), 전입신고와의 차이를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/확정일자-인터넷-발급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

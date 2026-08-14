import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 신청, 고용센터 어디로? 위치 조회와 방문 방법",
  description: "실업급여 신청은 거주지 관할 고용센터에서만 가능해요. 고용24에서 관할 센터 찾는 법, 방문 예약, 준비물, 영업시간까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-고용센터" },
  openGraph: {
    title: "실업급여 신청, 고용센터 어디로? 위치 조회와 방문 방법 | 머니위키",
    description: "실업급여 신청은 거주지 관할 고용센터에서만 가능해요. 고용24에서 관할 센터 찾는 법, 방문 예약, 준비물, 영업시간까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-고용센터",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

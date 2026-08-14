import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "관할 고용센터, 어디로 가야 할까? 거주지 기준 조회법",
  description: "실업급여는 거주지 관할 고용센터에서 신청해야 해요. 관할 고용센터 찾는 법과 온라인 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-관할-고용센터" },
  openGraph: {
    title: "관할 고용센터, 어디로 가야 할까? 거주지 기준 조회법 | 머니위키",
    description: "실업급여는 거주지 관할 고용센터에서 신청해야 해요. 관할 고용센터 찾는 법과 온라인 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-관할-고용센터",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

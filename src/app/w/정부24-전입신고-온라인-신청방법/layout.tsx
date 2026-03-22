import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "정부24 전입신고, 집에서 5분이면 끝나요 — 온라인 신청 방법 | 머니위키",
  description: "정부24에서 전입신고 온라인으로 할 수 있어요. 공동인증서나 간편인증 있으면 5분이면 끝나요. 확정일자는 인터넷등기소에서 따로 받아야 해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/정부24-전입신고-온라인-신청방법" },
  openGraph: {
    title: "정부24 전입신고, 집에서 5분이면 끝나요 — 온라인 신청 방법 | 머니위키",
    description: "정부24에서 전입신고 온라인으로 할 수 있어요. 공동인증서나 간편인증 있으면 5분이면 끝나요.",
    url: "https://www.jjyu.co.kr/w/정부24-전입신고-온라인-신청방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

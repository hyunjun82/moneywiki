import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금 신청했는데 탈락했다면? 탈락 사유와 재신청 방법 | 머니위키",
  description: "기초연금 탈락 사유를 확인하고 재신청하는 방법을 정리했어요. 소득인정액 초과, 직역연금 수급 등 사유별 대응법이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-탈락사유-재신청-방법" },
  openGraph: {
    title: "기초연금 신청했는데 탈락했다면? 탈락 사유와 재신청 방법 | 머니위키",
    description: "기초연금 탈락 사유를 확인하고 재신청하는 방법을 정리했어요. 소득인정액 초과, 직역연금 수급 등 사유별 대응법이에요.",
    url: "https://www.jjyu.co.kr/w/기초연금-탈락사유-재신청-방법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

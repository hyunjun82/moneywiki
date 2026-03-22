import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "파산 신청이 기각되는 경우는 어떤 건가요? 기각 사유와 재신청 방법 | 머니위키",
  description: "채무 초과가 아니거나 면책 불허 사유가 있으면 파산 신청이 기각돼요. 기각 사유를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/파산신청-기각-사유-요건-부족" },
  openGraph: { title: "파산 신청이 기각되는 경우는 어떤 건가요? 기각 사유와 재신청 방법 | 머니위키", description: "채무 초과가 아니거나 면책 불허 사유가 있으면 파산 신청이 기각돼요. 기각 사유를 정리했어요.", url: "https://www.jjyu.co.kr/w/파산신청-기각-사유-요건-부족", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

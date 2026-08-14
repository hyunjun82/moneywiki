import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "구직급여 지급 제한 해제 조건과 신청 방법",
  description: "구직급여 지급 제한 걸려도 1개월 후 재취업 활동 증명하면 해제받을 수 있어요. 해제 조건, 필요 서류, 소급 지급까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/구직급여-지급-제한-해제" },
  openGraph: {
    title: "구직급여 지급 제한 해제 조건과 신청 방법 | 머니위키",
    description: "구직급여 지급 제한 걸려도 해제받을 수 있어요. 해제 조건과 필요 서류를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/구직급여-지급-제한-해제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

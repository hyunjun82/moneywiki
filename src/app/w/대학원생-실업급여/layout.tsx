import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대학원생도 실업급여 된다고? RA·TA 수급 조건 체크리스트 | 머니위키",
  description: "대학원 다니면서도 실업급여를 받을 수 있습니다. 야간·주말 대학원은 문제없고, 전일제는 구직 의사 입증이 필요합니다. 조건과 구직활동 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대학원생-실업급여" },
  openGraph: {
    title: "대학원생도 실업급여 된다고? RA·TA 수급 조건 체크리스트 | 머니위키",
    description: "대학원 다니면서도 실업급여를 받을 수 있습니다. 야간·주말 대학원은 문제없고, 전일제는 구직 의사 입증이 필요합니다. 조건과 구직활동 방법을 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/대학원생-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

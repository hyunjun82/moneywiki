import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "소명 기회 없이 해고당했다면? — 부당해고 구제 신청 방법 | 머니위키",
  description: "취업규칙에 소명 규정이 있는데 안 지켰다면 부당해고가 될 수 있어요. 증거 확보 방법, 노동위원회 구제 신청 절차, 3개월 기한까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/해고-소명기회-미부여-효력" },
  openGraph: {
    title: "소명 기회 없이 해고당했다면? — 부당해고 구제 신청 방법 | 머니위키",
    description: "취업규칙에 소명 규정이 있는데 안 지켰다면 부당해고가 될 수 있어요. 증거 확보 방법, 노동위원회 구제 신청 절차, 3개월 기한까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/해고-소명기회-미부여-효력",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

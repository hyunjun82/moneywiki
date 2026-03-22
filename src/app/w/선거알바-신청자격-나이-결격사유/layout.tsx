import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "선거 알바 누가 할 수 있을까? 나이 제한과 결격 사유 | 머니위키",
  description: "선거 알바는 만 18세 이상 선거권자면 누구나 가능해요. 공무원, 정당 당원, 후보자 가족 등 결격사유 대상자만 제외되죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/선거알바-신청자격-나이-결격사유" },
  openGraph: {
    title: "선거 알바 누가 할 수 있을까? 나이 제한과 결격 사유 | 머니위키",
    description: "선거 알바는 만 18세 이상 선거권자면 누구나 가능해요. 결격사유 대상자만 제외되죠.",
    url: "https://www.jjyu.co.kr/w/선거알바-신청자격-나이-결격사유",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

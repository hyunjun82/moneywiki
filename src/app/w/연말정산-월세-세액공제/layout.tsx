import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "월세 내면 세금 돌려받을 수 있을까? 세액공제 조건과 신청 방법",
  description: "무주택 세대주가 월세 내면 최대 17% 세액공제받아요. 2025년 귀속부터 한도가 1,000만원으로 올랐고, 집주인 동의 없이 신청 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-월세-세액공제" },
  openGraph: {
    title: "월세 내면 세금 돌려받을 수 있을까? 세액공제 조건과 신청 방법 | 머니위키",
    description: "무주택 세대주가 월세 내면 최대 17% 세액공제받아요. 2025년 귀속부터 한도가 1,000만원으로 올랐고, 집주인 동의 없이 신청 가능해요.",
    url: "https://www.jjyu.co.kr/w/연말정산-월세-세액공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

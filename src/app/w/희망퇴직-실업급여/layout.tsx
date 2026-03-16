import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "희망퇴직도 실업급여 받을까? 수급 조건과 금액 | 머니위키",
  description: "회사 주도 희망퇴직은 권고사직으로 인정돼서 실업급여를 받을 수 있어요. 위로금과 별개이고, 이직확인서 기재 방법이 핵심이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/희망퇴직-실업급여" },
  openGraph: {
    title: "희망퇴직도 실업급여 받을까? 수급 조건과 금액 | 머니위키",
    description: "회사 주도 희망퇴직은 권고사직으로 인정돼서 실업급여를 받을 수 있어요. 위로금과 별개이고, 이직확인서 기재 방법이 핵심이에요.",
    url: "https://www.jjyu.co.kr/w/희망퇴직-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

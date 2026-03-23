export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "집주인이 바뀌었는데 내 보증금은? 대항력·우선변제권 유지 조건 | 머니위키",
  description: "임대인이 변경돼도 대항력과 우선변제권은 자동으로 유지돼요. 새 집주인 확인 방법과 주의사항을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임대인-변경-대항력-우선변제권-유지" },
  openGraph: {
    title: "집주인이 바뀌었는데 내 보증금은? 대항력·우선변제권 유지 조건 | 머니위키",
    description: "임대인이 변경돼도 대항력과 우선변제권은 자동으로 유지돼요. 새 집주인 확인 방법과 주의사항을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/임대인-변경-대항력-우선변제권-유지",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

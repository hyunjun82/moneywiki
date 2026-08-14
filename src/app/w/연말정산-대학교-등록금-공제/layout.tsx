import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 대학교 등록금 공제, 얼마나 받나요?",
  description: "자녀 대학 등록금은 1인당 900만원 한도로 15% 세액공제돼요. 본인 대학·대학원은 한도 없이 전액 공제예요. 장학금, 부양가족 조건까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-대학교-등록금-공제" },
  openGraph: {
    title: "연말정산 대학교 등록금 공제, 얼마나 받나요? | 머니위키",
    description: "자녀 대학 등록금은 1인당 900만원 한도로 15% 세액공제돼요. 본인 대학·대학원은 한도 없이 전액 공제예요. 장학금, 부양가족 조건까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-대학교-등록금-공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

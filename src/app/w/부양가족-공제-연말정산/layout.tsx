import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부양가족 공제, 소득요건·나이 조건과 등록 방법",
  description: "부양가족 1인당 150만원 소득공제. 소득 100만원 이하, 부모 60세 이상, 자녀 20세 이하 조건. 홈택스 등록 방법과 중복공제 가산세까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/부양가족-공제-연말정산" },
  openGraph: {
    title: "부양가족 공제, 소득요건·나이 조건과 등록 방법 | 머니위키",
    description: "부양가족 1인당 150만원 소득공제. 소득 100만원 이하, 부모 60세 이상, 자녀 20세 이하 조건.",
    url: "https://www.jjyu.co.kr/w/부양가족-공제-연말정산",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }

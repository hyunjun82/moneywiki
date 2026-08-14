import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부양가족 공제 — 나이·소득 요건과 공제 금액",
  description: "부양가족 1인당 150만원 소득공제, 세율에 따라 22만~36만원 환급. 배우자·부모님·자녀·형제자매별 나이, 소득, 동거 요건과 추가공제까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-부양가족-공제",
  },
  openGraph: {
    title: "부양가족 공제 — 나이·소득 요건과 공제 금액",
    description: "1인당 150만원 소득공제. 부모님 60세+, 자녀 20세-, 소득 100만원 이하 요건과 추가공제.",
    url: "https://www.jjyu.co.kr/w/연말정산-부양가족-공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

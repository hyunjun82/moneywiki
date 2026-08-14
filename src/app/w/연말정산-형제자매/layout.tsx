import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 형제자매 부양가족 공제",
  description: "형제자매 부양가족 공제 조건: 만 20세 이하 or 만 60세 이상, 소득 100만원 이하. 신용카드·의료비 공제는 안 돼요.",
  openGraph: {
    title: "연말정산 형제자매 부양가족 공제",
    description: "나이·소득 조건 확인 후 1인당 연 150만원 공제. 신용카드 공제 제한 주의.",
    url: "https://jjyu.co.kr/w/연말정산-형제자매",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/연말정산-형제자매",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

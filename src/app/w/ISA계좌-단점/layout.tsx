import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ISA 계좌 단점 3년 의무가입 해외주식 제한",
  description: "ISA 계좌 핵심 단점: 3년 의무가입, 해외주식 직접 불가, ETF 수수료 높음. 중도해지하면 비과세 소멸하고 15.4% 세금 내야 해요.",
  openGraph: {
    title: "ISA 계좌 단점 3년 의무가입 해외주식 제한",
    description: "ISA 단점 5가지와 안 맞는 사람 기준을 정리했어요.",
    url: "https://jjyu.co.kr/w/ISA계좌-단점",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/ISA계좌-단점" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "농협 퇴직연금 수수료와 운용 상품 가입 방법과 장단점 | 머니위키",
  description: "농협 퇴직연금 수수료와 운용 상품 가입 방법과 장단점에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농협-퇴직연금" },
  openGraph: { title: "농협 퇴직연금 수수료와 운용 상품 가입 방법과 장단점", description: "농협 퇴직연금 수수료와 운용 상품 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/농협-퇴직연금", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

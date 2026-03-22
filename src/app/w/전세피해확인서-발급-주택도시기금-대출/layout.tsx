import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전세피해확인서 발급 — 주택도시기금 대출 신청 방법 | 머니위키",
  description: "전세사기 피해자는 전세피해확인서를 발급받아 주택도시기금 저금리 대출을 신청할 수 있어요. 발급 절차와 필요 서류를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세피해확인서-발급-주택도시기금-대출" },
  openGraph: { title: "전세피해확인서 발급 — 주택도시기금 대출 신청 방법", description: "온라인 발급부터 기금 대출 신청까지 절차 정리.", url: "https://www.jjyu.co.kr/w/전세피해확인서-발급-주택도시기금-대출", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

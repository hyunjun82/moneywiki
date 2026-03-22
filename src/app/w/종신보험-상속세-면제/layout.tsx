import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "종신보험 상속세 면제 조건: 계약자 수익자 구조 | 머니위키",
  description: "종신보험 가입하면 상속세를 안 낼 수 있다는 말 들어보셨나요? 계약자와 수익자를 누구로 하느냐에 따라 세금이 달라져요. 절세 전략까지 정리해드려요",
  openGraph: { title: "종신보험 상속세 면제 조건: 계약자 수익자 구조 | 머니위키", description: "종신보험 가입하면 상속세를 안 낼 수 있다는 말 들어보셨나요? 계약자와 수익자를 누구로 하느냐에 따라 세금이 달라져요. 절세 전략까지 정리해드려요", url: "https://www.jjyu.co.kr/w/종신보험-상속세-면제", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/종신보험-상속세-면제" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

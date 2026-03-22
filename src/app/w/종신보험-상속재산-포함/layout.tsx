import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "종신보험 사망보험금 상속재산: 포함 여부 과세 기준 | 머니위키",
  description: "종신보험 가입할 때 계약자를 누구로 하느냐에 따라 상속세가 달라진다는 거 아시나요? 계약 구조별 상속재산 포함 여부와 과세 기준을 알려드려요",
  openGraph: { title: "종신보험 사망보험금 상속재산: 포함 여부 과세 기준", description: "종신보험 가입할 때 계약자를 누구로 하느냐에 따라 상속세가 달라진다는 거 아시나요? 계약 구조별 상속재산 포함 여부와 과세 기준을 알려드려요", url: "https://jjyu.co.kr/w/종신보험-상속재산-포함" },
  alternates: { canonical: "https://jjyu.co.kr/w/종신보험-상속재산-포함" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

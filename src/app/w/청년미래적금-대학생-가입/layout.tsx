import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "청년미래적금, 대학생도 가입할 수 있을까? 자격 조건부터 신청까지 | 머니위키",
  description: "만19~34세 청년이면 대학생·취준생도 가입 가능해요. 소득이 없으면 소득 조건은 자동 충족이고, 정부 기여금 6~12%를 받아 3년 만기 시 최대 2,200만원을 수령할 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/청년미래적금-대학생-가입",
  },
  openGraph: {
    title: "청년미래적금, 대학생도 가입할 수 있을까?",
    description: "만19~34세, 소득 6,000만원 이하면 대학생도 OK. 정부 기여금 6~12%, 3년 만기 최대 2,200만원.",
    url: "https://www.jjyu.co.kr/w/청년미래적금-대학생-가입",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

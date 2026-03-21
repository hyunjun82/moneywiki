import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ISA 계좌, 가입하면 뭐가 좋을까? 비과세 한도부터 개설까지 | 머니위키",
  description: "ISA 계좌 비과세 한도 서민형 400만원, 일반형 200만원 차이. 중개형·신탁형 비교, 손익통산 절세 구조, 5분 개설 방법까지 정리했어요.",
  openGraph: {
    title: "ISA 계좌, 가입하면 뭐가 좋을까?",
    description: "서민형 400만원 비과세. 중개형vs신탁형 차이, 손익통산 절세, 개설 방법 정리.",
    url: "https://jjyu.co.kr/w/ISA계좌",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/ISA계좌",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

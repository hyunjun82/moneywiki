import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "가사근로자도 근로기준법 적용될까? 보호 범위와 예외 조건 | 머니위키",
  description: "정부인증 가사서비스업체 소속 가사근로자는 최저임금, 퇴직금, 산재보험 보호를 받아요. 개인 고용 가사사용인과의 차이점, 통근형·입주형 적용 범위를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/가사근로자-근로기준법-적용",
  },
  openGraph: {
    title: "가사근로자도 근로기준법 적용될까? 보호 범위와 예외 조건",
    description: "정부인증 업체 소속이면 최저임금·퇴직금·산재보험 보장, 개인 고용이면 적용 제외. 통근형과 입주형 차이까지.",
    url: "https://www.jjyu.co.kr/w/가사근로자-근로기준법-적용",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

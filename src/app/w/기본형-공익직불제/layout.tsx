import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기본형 공익직불제 신청 방법과 자격",
  description: "농업경영체 등록 농업인이라면 ha당 최대 205만원 직불금을 받을 수 있죠. 신청 자격, 지원 단가, 이행 조건을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기본형-공익직불제" },
  openGraph: { title: "기본형 공익직불제 신청 방법과 자격 | 머니위키", description: "농업경영체 등록 농업인이라면 ha당 최대 205만원 직불금을 받을 수 있죠. 신청 자격, 지원 단가, 이행 조건을 정리했어요.", url: "https://www.jjyu.co.kr/w/기본형-공익직불제", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

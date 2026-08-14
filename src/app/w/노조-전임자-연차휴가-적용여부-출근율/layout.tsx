import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "노조 전임자 연차휴가 적용여부 출근율",
  description: "노조 전임자도 연차휴가를 받을 수 있나요? 전임자의 연차휴가 발생과 출근율 계산을 알려드릴게요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/노조-전임자-연차휴가-적용여부-출근율" },
  openGraph: { title: "노조 전임자 연차휴가 적용여부 출근율 | 머니위키", description: "노조 전임자도 연차휴가를 받을 수 있나요? 전임자의 연차휴가 발생과 출근율 계산을 알려드릴게요.", url: "https://www.jjyu.co.kr/w/노조-전임자-연차휴가-적용여부-출근율", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

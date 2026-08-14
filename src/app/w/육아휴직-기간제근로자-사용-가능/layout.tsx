import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기간제 근로자도 육아휴직 가능한가? 사용 조건과 계약 보호",
  description: "기간제 근로자도 육아휴직 가능한가? 사용 조건과 계약 보호에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아휴직-기간제근로자-사용-가능" },
  openGraph: { title: "기간제 근로자도 육아휴직 가능한가? 사용 조건과 계약 보호", description: "기간제 근로자도 육아휴직 가능한가? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/육아휴직-기간제근로자-사용-가능", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

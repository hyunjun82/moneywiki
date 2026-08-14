import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "아파트 어린이놀이시설 관리 안전검사 2026",
  description: "우리 아파트 놀이터가 안전한지 걱정이에요. 어린이놀이시설은 어떻게 관리되고 안전검사는 언제 하나요?",
  alternates: { canonical: "https://www.jjyu.co.kr/w/아파트-어린이놀이시설-관리-안전검사" },
  openGraph: { title: "아파트 어린이놀이시설 관리 안전검사 2026 | 머니위키", description: "우리 아파트 놀이터가 안전한지 걱정이에요. 어린이놀이시설은 어떻게 관리되고 안전검사는 언제 하나요?", url: "https://www.jjyu.co.kr/w/아파트-어린이놀이시설-관리-안전검사", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

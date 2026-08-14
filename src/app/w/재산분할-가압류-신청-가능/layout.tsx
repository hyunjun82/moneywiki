import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 전에 배우자 재산을 묶어둘 수 있나요? 재산분할 가압류 신청 조건과 절차",
  description: "이혼 전에도 배우자 재산을 가압류로 동결할 수 있어요. 피보전권리와 보전필요성 요건, 신청 5단계 절차, 담보금 기준, 필요 서류를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/재산분할-가압류-신청-가능",
  },
  openGraph: {
    title: "이혼 전에 배우자 재산을 묶어둘 수 있나요? 재산분할 가압류 신청 조건과 절차",
    description: "재산분할 가압류 요건, 신청 절차, 담보금 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/재산분할-가압류-신청-가능",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

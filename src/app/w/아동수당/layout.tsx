import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "아동수당, 누가 얼마나 받나요? 지급 조건과 신청 방법",
  description: "만 8세 미만 아동이면 소득·재산 기준 없이 월 10만원을 받아요. 출생신고 시 원스톱 신청 가능. 부모급여와 중복 수급도 돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/아동수당",
  },
  openGraph: {
    title: "아동수당, 누가 얼마나 받나요? 지급 조건과 신청 방법",
    description: "만 8세 미만 월 10만원. 소득 기준 없이 보편 지급. 부모급여와 중복 가능.",
    url: "https://www.jjyu.co.kr/w/아동수당",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

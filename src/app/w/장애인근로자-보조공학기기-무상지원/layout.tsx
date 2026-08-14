import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "장애인 근로자 보조공학기기, 무료로 받는 법 지원 품목과 신청 절차",
  description: "한국장애인고용공단에서 장애인 근로자의 업무용 보조공학기기를 무상 지원해요. 점자단말기, 화상전화기, 높낮이 책상 등 장애인 1인당 최대 1,500만원(중증 2,000만원)까지 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/장애인근로자-보조공학기기-무상지원",
  },
  openGraph: {
    title: "장애인 근로자 보조공학기기, 무료로 받는 법 지원 품목과 신청 절차",
    description: "최대 1,500만원(중증 2,000만원) 무상 지원. 신청 방법 정리.",
    url: "https://www.jjyu.co.kr/w/장애인근로자-보조공학기기-무상지원",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

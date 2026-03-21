import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "법인 차량 운행일지 작성 방법, 1,500만원 초과 경비 인정 기준 | 머니위키",
  description: "법인 차량 연 1,500만원 초과 경비 인정받으려면 운행일지가 필수예요. 업무용 보험 가입, 필수 기재 항목, 감가상각 처리, 세무조사 대비법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/법인-차량-운행일지-작성-방법" },
  openGraph: {
    title: "법인 차량 운행일지 작성 방법, 1,500만원 초과 경비 인정 기준 | 머니위키",
    description: "법인 차량 연 1,500만원 초과 경비 인정받으려면 운행일지가 필수예요. 업무용 보험 가입, 필수 기재 항목, 감가상각 처리, 세무조사 대비법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/법인-차량-운행일지-작성-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

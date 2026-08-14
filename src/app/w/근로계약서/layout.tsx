import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "근로계약서 필수 기재사항 6가지, 미작성 시 과태료와 작성 방법",
  description: "근로계약서에 임금, 근로시간, 휴일, 연차, 업무 내용, 계약기간을 반드시 써야 해요. 미작성 시 500만원 과태료. 표준 양식 다운로드부터 교부까지 절차 정리.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/근로계약서",
  },
  openGraph: {
    title: "근로계약서 필수 기재사항 6가지, 미작성 시 과태료와 작성 방법",
    description: "임금·근로시간·휴일·연차·업무·계약기간 필수. 안 쓰면 500만원 과태료.",
    url: "https://www.jjyu.co.kr/w/근로계약서",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

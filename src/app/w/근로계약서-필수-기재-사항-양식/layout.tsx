import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "근로계약서, 꼭 들어가야 할 4가지는? 필수 기재 사항과 표준 양식 | 머니위키",
  description: "근로기준법 제17조에 따라 임금, 소정근로시간, 휴일, 연차 유급휴가 4가지는 반드시 서면으로 명시해야 해요. 미교부 시 500만원 이하 벌금. 표준 양식은 고용노동부에서 무료 다운로드 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/근로계약서-필수-기재-사항-양식",
  },
  openGraph: {
    title: "근로계약서, 꼭 들어가야 할 4가지는? 필수 기재 사항과 표준 양식",
    description: "임금·근로시간·휴일·연차 4가지 필수. 미교부 시 벌금 500만원.",
    url: "https://www.jjyu.co.kr/w/근로계약서-필수-기재-사항-양식",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

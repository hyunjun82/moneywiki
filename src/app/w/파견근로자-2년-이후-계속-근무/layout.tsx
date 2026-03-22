import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "파견근로자 2년 넘으면? 직접고용 요청 방법과 거부 시 대응 | 머니위키",
  description: "파견근로자 2년 초과 시 사용사업주에게 직접고용 의무가 발생해요. 요청 절차, 거부 시 3년 징역·3천만원 벌금 처벌, 직접고용 후 근로조건까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/파견근로자-2년-이후-계속-근무",
  },
  openGraph: {
    title: "파견근로자 2년 넘으면? 직접고용 요청 방법과 거부 시 대응",
    description: "2년 초과하면 직접고용 의무 발생. 서면 요청 → 거부 시 노동부 신고 → 형사처벌 가능.",
    url: "https://www.jjyu.co.kr/w/파견근로자-2년-이후-계속-근무",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

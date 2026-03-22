import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전세계약서 작성방법, 필수 항목과 특약 예시 | 머니위키",
  description: "전세계약서에 보증금·계약 기간·특약이 빠지면 분쟁 시 불리해요. 필수 기재사항부터 특약 샘플, 확정일자·전입신고까지 순서대로 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/전세계약서-작성방법",
  },
  openGraph: {
    title: "전세계약서 작성방법, 필수 항목과 특약 예시",
    description: "보증금 지키는 계약서 작성법. 필수 항목·특약·확정일자까지.",
    url: "https://www.jjyu.co.kr/w/전세계약서-작성방법",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

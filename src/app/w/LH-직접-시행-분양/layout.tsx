import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "LH 직접시행 분양이 뭔가요? 기존 공공분양과의 차이와 청약 일정 | 머니위키",
  description: "LH 직접시행은 공공택지를 민간에 안 팔고 LH가 직접 짓는 방식이에요. 공급 속도 2년 단축, 2026년 수도권 3,000가구 착공, 분양가상한제 적용 전망을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/LH-직접-시행-분양",
  },
  openGraph: {
    title: "LH 직접시행 분양이 뭔가요? 기존 공공분양과의 차이와 청약 일정",
    description: "공급 2년 단축, 2026년 착공 시작. 기존 방식과의 차이와 청약 준비법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/LH-직접-시행-분양",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

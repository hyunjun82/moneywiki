import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전세보증금 안 돌려줄 때 어떻게 받아내나요? 반환 절차 5단계 | 머니위키",
  description: "전세 계약 끝났는데 보증금 안 주면 내용증명 → 지급명령 → 강제집행 순서로 받아내세요. 임차권등기명령으로 이사 가도 권리를 지킬 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/전세보증금-반환-절차",
  },
  openGraph: {
    title: "전세보증금 안 돌려줄 때 어떻게 받아내나요? 반환 절차 5단계",
    description: "보증금 미반환 시 단계별 대응법. 임차권등기명령까지.",
    url: "https://www.jjyu.co.kr/w/전세보증금-반환-절차",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

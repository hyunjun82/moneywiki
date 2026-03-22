import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "모델하우스와 실제 아파트 다를 때 손해배상 | 머니위키",
  description: "입주했더니 바닥재랑 창틀이 모델하우스랑 달라요. 손해배상받을 수 있을까요? 중요한 차이면 청구 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/모델하우스-실제-아파트-차이-손해배상" },
  openGraph: {
    title: "모델하우스와 실제 아파트 다를 때 손해배상",
    description: "입주했더니 바닥재랑 창틀이 모델하우스랑 달라요. 손해배상받을 수 있을까요? 중요한 차이면 청구 가능해요.",
    url: "https://www.jjyu.co.kr/w/모델하우스-실제-아파트-차이-손해배상",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

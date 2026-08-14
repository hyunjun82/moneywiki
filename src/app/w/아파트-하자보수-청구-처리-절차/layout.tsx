import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "아파트 하자보수 청구 처리 절차",
  description: "아파트 하자보수를 청구하면 어떻게 처리되나요? 15일 이내 보수하거나 계획을 통보해야 해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/아파트-하자보수-청구-처리-절차" },
  openGraph: { title: "아파트 하자보수 청구 처리 절차 | 머니위키", description: "아파트 하자보수를 청구하면 어떻게 처리되나요? 15일 이내 보수하거나 계획을 통보해야 해요.", url: "https://www.jjyu.co.kr/w/아파트-하자보수-청구-처리-절차", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

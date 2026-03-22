import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 운용지시 변경과 절차 안내 | 머니위키",
  description: "DC형 퇴직연금은 직접 상품을 선택해야 해요. 운용지시 안 하면 이자가 거의 안 붙어서 큰 손해를 봐요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-운용지시" },
  openGraph: { title: "퇴직연금 운용지시 변경과 절차 안내", description: "DC형 퇴직연금은 직접 상품을 선택해야 해요. 운용지시 안 하면 이자가 거의 안 붙어서 큰 손해를 봐요", url: "https://www.jjyu.co.kr/w/퇴직연금-운용지시", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

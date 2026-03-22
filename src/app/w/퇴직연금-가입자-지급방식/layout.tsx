import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 가입자 지급방식: 수령 방법 및 선택 기준 | 머니위키",
  description: "퇴직연금을 받을 때 한 번에 받을지 나눠서 받을지 고민되시죠? 일시금과 연금수령의 세금 차이와 어떤 방식이 유리한지 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-가입자-지급방식" },
  openGraph: { title: "퇴직연금 가입자 지급방식: 수령 방법 및 선택 기준 | 머니위키", description: "퇴직연금을 받을 때 한 번에 받을지 나눠서 받을지 고민되시죠? 일시금과 연금수령의 세금 차이와 어떤 방식이 유리한지 알려드려요", url: "https://www.jjyu.co.kr/w/퇴직연금-가입자-지급방식", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

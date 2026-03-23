import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "고용증대 세액공제 요건 및 공제액 계산: 1,300만원 2년 고용유지 | 머니위키",
  description: "직원을 한 명 더 고용하면 세금을 깎아주는 공제가 있어요. 어떤 조건에서 받을 수 있고, 얼마를 받을 수 있는지 쉽게 설명해드릴게요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/고용증대-세액공제-요건-공제액-계산" },
  openGraph: {
    title: "고용증대 세액공제 요건 및 공제액 계산: 1,300만원 2년 고용유지",
    description: "직원을 한 명 더 고용하면 세금을 깎아주는 공제가 있어요. 어떤 조건에서 받을 수 있고, 얼마를 받을 수 있는지 쉽게 설명해드릴게요",
    url: "https://www.jjyu.co.kr/w/고용증대-세액공제-요건-공제액-계산",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "아동수당 지역사랑상품권으로 받아도 되나요? 지급 방식과 변경 방법 | 머니위키",
  description: "수급자가 동의하면 아동수당을 지역사랑상품권으로 받을 수 있어요. 2026년 개정으로 인구감소지역은 상품권 시 추가 금액이 붙어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/아동수당-지역사랑상품권-지급-가능",
  },
  openGraph: {
    title: "아동수당 지역사랑상품권 지급 가능 여부",
    description: "수급자 동의 시 상품권 지급 가능. 변경 방법 안내.",
    url: "https://www.jjyu.co.kr/w/아동수당-지역사랑상품권-지급-가능",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

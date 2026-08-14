import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연차휴가, 언제 소멸되고 수당은 언제까지? 소멸시효와 청구 기한",
  description: "연차휴가는 1년 안에 써야 소멸 안 돼요. 수당 청구 시효는 3년이에요. 사용촉진 절차 여부에 따라 수당 지급이 달라져요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연차휴가-소멸시효" },
  openGraph: {
    title: "연차휴가, 언제 소멸되고 수당은 언제까지? 소멸시효와 청구 기한 | 머니위키",
    description: "연차휴가는 1년 안에 써야 소멸 안 돼요. 수당 청구 시효는 3년이에요. 사용촉진 절차 여부에 따라 수당 지급이 달라져요.",
    url: "https://www.jjyu.co.kr/w/연차휴가-소멸시효",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

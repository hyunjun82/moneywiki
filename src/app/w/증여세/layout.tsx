import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "증여세, 부모한테 얼마까지 세금 없이 받나요? 세율·공제·계산법 | 머니위키",
  description: "성인 자녀 5천만원, 배우자 6억원까지 10년간 공제돼요. 혼인 전후 2년이면 1억 추가 공제. 세율은 10~50%이고, 증여일로부터 3개월 내 자진신고하면 3% 공제예요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/증여세",
  },
  openGraph: {
    title: "증여세, 부모한테 얼마까지 세금 없이 받나요?",
    description: "자녀 5천만원, 배우자 6억 공제. 10~50% 세율과 계산 예시.",
    url: "https://www.jjyu.co.kr/w/증여세",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "장애인 고용장려금 신청 자격: 의무고용률 초과 사업주 지원금 받기",
  description: "장애인 고용장려금은 의무고용률 3.1%를 초과해 장애인을 고용한 사업주가 받을 수 있어요. 중증 여성은 월 80만원, 경증 남성은 월 30만원을 지원받아요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/장애인-고용장려금-신청-자격" },
  openGraph: {
    title: "장애인 고용장려금 신청 자격: 의무고용률 초과 사업주 지원금 받기",
    description: "장애인 고용장려금은 의무고용률 3.1%를 초과해 장애인을 고용한 사업주가 받을 수 있어요. 중증 여성은 월 80만원, 경증 남성은 월 30만원을 지원받아요",
    url: "https://www.jjyu.co.kr/w/장애인-고용장려금-신청-자격",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

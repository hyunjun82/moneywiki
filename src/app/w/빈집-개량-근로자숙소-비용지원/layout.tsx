import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "빈집 고쳐서 숙소로 쓰면 비용 지원받을 수 있나요? 빈집 개량 지원 조건과 절차",
  description: "농어촌 빈집을 근로자 숙소로 개량하면 최대 5천만원까지 비용 지원이 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/빈집-개량-근로자숙소-비용지원" },
  openGraph: { title: "빈집 고쳐서 숙소로 쓰면 비용 지원받을 수 있나요? 빈집 개량 지원 조건과 절차 | 머니위키", description: "농어촌 빈집을 근로자 숙소로 개량하면 최대 5천만원까지 비용 지원이 가능해요.", url: "https://www.jjyu.co.kr/w/빈집-개량-근로자숙소-비용지원", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

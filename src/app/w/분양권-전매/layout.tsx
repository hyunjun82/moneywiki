import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "분양권, 언제부터 팔 수 있나요? 전매 제한·절차·세금까지 | 머니위키",
  description: "비규제지역 분양권은 당첨 후 6개월~1년이면 전매 가능하고, 규제지역은 소유권이전등기 전까지 금지예요. 전매 절차 5단계와 보유기간별 양도소득세율까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/분양권-전매",
  },
  openGraph: {
    title: "분양권 전매 제한 기간·절차·세금",
    description: "비규제 6개월, 규제지역 소유권이전등기까지. 전매 절차와 양도세까지.",
    url: "https://www.jjyu.co.kr/w/분양권-전매",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "IRP 개인퇴직계좌 세제 혜택, 과세이연·세액공제·연금 수령 | 머니위키",
  description: "IRP에 퇴직금을 넣으면 세금을 연금 수령 시까지 미루고 30~40% 줄일 수 있어요. 개설 방법과 활용 4단계를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/IRP-개인퇴직계좌-세제-혜택" },
  openGraph: {
    title: "IRP 개인퇴직계좌 세제 혜택, 과세이연·세액공제·연금 수령 | 머니위키",
    description: "IRP에 퇴직금을 넣으면 세금을 연금 수령 시까지 미루고 30~40% 줄일 수 있어요. 개설 방법과 활용 4단계를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/IRP-개인퇴직계좌-세제-혜택",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

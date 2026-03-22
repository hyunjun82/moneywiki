import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "개인퇴직연금(IRP), 가입하면 뭐가 좋은가요? 세액공제 혜택과 가입 방법 | 머니위키",
  description: "IRP는 연 900만원 한도 세액공제, 퇴직금 수령 시 세금 절약까지 가능해요. 가입 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/개인퇴직연금" },
  openGraph: { title: "개인퇴직연금(IRP), 가입하면 뭐가 좋은가요? 세액공제 혜택과 가입 방법 | 머니위키", description: "IRP는 연 900만원 한도 세액공제, 퇴직금 수령 시 세금 절약까지 가능해요. 가입 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/개인퇴직연금", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

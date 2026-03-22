import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "중개형 IRP 수수료 0%가 진짜? 장점 5가지와 개설 방법 | 머니위키",
  description: "비대면 가입하면 수수료 평생 0원, ETF 200개 이상 직접 매매, 세액공제 최대 148.5만원. 신탁형과의 차이와 개설 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/중개형-IRP-장점-수수료" },
  openGraph: {
    title: "중개형 IRP 수수료 0%가 진짜? 장점 5가지와 개설 방법 | 머니위키",
    description: "비대면 가입하면 수수료 평생 0원, ETF 200개 이상 직접 매매, 세액공제 최대 148.5만원. 신탁형과의 차이와 개설 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/중개형-IRP-장점-수수료",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

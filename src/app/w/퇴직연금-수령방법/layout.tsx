import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 수령방법, 55세 기준 DB·DC·IRP 인출 절차와 세금 | 머니위키",
  description: "55세 이후면 일시금·연금 자유 선택, 55세 미만이면 IRP 경유 필수. DB형·DC형·IRP별 인출 절차와 일시금·연금 세금 차이를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-수령방법" },
  openGraph: {
    title: "퇴직연금 수령방법, 55세 기준 DB·DC·IRP 인출 절차와 세금 | 머니위키",
    description: "55세 이후면 일시금·연금 자유 선택, 55세 미만이면 IRP 경유 필수. DB형·DC형·IRP별 인출 절차와 일시금·연금 세금 차이를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-수령방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

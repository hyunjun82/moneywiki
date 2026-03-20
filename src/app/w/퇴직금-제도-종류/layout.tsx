import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "DB형·DC형·법정 퇴직금, 뭐가 달라요? | 머니위키",
  description: "법정 퇴직금, DB형(확정급여형), DC형(확정기여형) 세 제도의 차이와 유불리 기준을 정리했어요. DC형 방치 위험, IRP 개설 시기, 연금 수령 절세까지 한 번에.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-제도-종류" },
  openGraph: {
    title: "DB형·DC형·법정 퇴직금, 뭐가 달라요? | 머니위키",
    description: "법정 퇴직금, DB형, DC형 세 제도 차이와 유불리 기준, DC형 방치 위험, IRP 개설 시기까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-제도-종류",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

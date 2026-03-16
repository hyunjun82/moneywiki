import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 제도 종류, DB형·DC형·IRP 뭐가 다를까? | 머니위키",
  description: "퇴직금 제도는 퇴직금(DB형), 확정기여형(DC형), 개인형퇴직연금(IRP) 세 가지로 나뉩니다. 각 제도의 차이점, 유불리 비교, 중간 전환 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-제도-종류" },
  openGraph: {
    title: "퇴직금 제도 종류, DB형·DC형·IRP 뭐가 다를까? | 머니위키",
    description: "퇴직금 제도는 퇴직금(DB형), 확정기여형(DC형), 개인형퇴직연금(IRP) 세 가지로 나뉩니다. 각 제도의 차이점과 유불리를 비교했습니다.",
    url: "https://www.jjyu.co.kr/w/퇴직금-제도-종류",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

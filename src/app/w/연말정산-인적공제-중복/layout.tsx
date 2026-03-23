import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부양가족 중복 공제하면 둘 다 추징돼요 | 머니위키",
  description: "연말정산 인적공제 중복은 주민번호 전산 대조로 100% 적발돼요. 형제·맞벌이 부부 중복 유형과 가산세, 미리 막는 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-인적공제-중복",
  },
  openGraph: {
    title: "부양가족 중복 공제하면 둘 다 추징돼요",
    description: "인적공제 중복 유형과 가산세, 예방 방법.",
    url: "https://www.jjyu.co.kr/w/연말정산-인적공제-중복",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

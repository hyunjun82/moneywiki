import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이혼 친권·양육권 | 법원 결정 기준과 유리하게 받는 방법 | 머니위키",
  description:
    "이혼 시 친권과 양육권은 어떻게 나뉘고 법원은 무엇을 기준으로 결정할까요. 친권·양육권의 차이, 법원 판단 기준, 양육권을 유리하게 받는 준비 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-친권-양육권" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

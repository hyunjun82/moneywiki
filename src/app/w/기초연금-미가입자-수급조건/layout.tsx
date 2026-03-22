import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "국민연금 한 번도 안 냈는데 기초연금 될까? 미가입자 수급 조건 | 머니위키",
  description: "국민연금 미가입자도 기초연금을 받을 수 있어요. 소득인정액만 기준 이하면 되죠. 미가입자 수급 조건과 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-미가입자-수급조건" },
  openGraph: {
    title: "국민연금 한 번도 안 냈는데 기초연금 될까? 미가입자 수급 조건 | 머니위키",
    description: "국민연금 미가입자도 기초연금을 받을 수 있어요. 소득인정액만 기준 이하면 되죠. 미가입자 수급 조건과 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-미가입자-수급조건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

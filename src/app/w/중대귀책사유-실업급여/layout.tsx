import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "중대 귀책사유 해고, 실업급여 안 될까? 자격과 이의신청 절차 | 머니위키",
  description: "중대한 귀책사유로 해고되면 실업급여가 제한돼요. 하지만 단순 업무능력 부족이나 경미한 규칙 위반은 예외일 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/중대귀책사유-실업급여" },
  openGraph: {
    title: "중대 귀책사유 해고, 실업급여 안 될까? 자격과 이의신청 절차 | 머니위키",
    description: "중대한 귀책사유로 해고되면 실업급여가 제한돼요. 하지만 단순 업무능력 부족이나 경미한 규칙 위반은 예외일 수 있어요.",
    url: "https://www.jjyu.co.kr/w/중대귀책사유-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

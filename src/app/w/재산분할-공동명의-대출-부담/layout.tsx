import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 시 공동명의 대출, 누가 갚나요? 채무 분담 기준과 처리 방법 | 머니위키",
  description: "공동명의 대출은 이혼해도 은행에 둘 다 책임져야 해요. 재산분할 시 채무 분담 기준과 대출 정리 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/재산분할-공동명의-대출-부담",
  },
  openGraph: {
    title: "이혼 시 공동명의 대출, 누가 갚나요? 채무 분담 기준과 처리 방법",
    description: "공동명의 대출 재산분할 기준과 이혼 후 대출 처리 방법.",
    url: "https://www.jjyu.co.kr/w/재산분할-공동명의-대출-부담",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

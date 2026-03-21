import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 수령 나이 55세 기준, 조기 수령 조건 5가지 | 머니위키",
  description: "퇴직연금은 만 55세부터 받을 수 있어요. 주택 구입·요양 등 부득이한 사유 5가지가 있으면 55세 전에도 인출할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-수령-나이-55세-기준-조기-수령" },
  openGraph: {
    title: "퇴직연금 수령 나이 55세 기준, 조기 수령 조건 5가지 | 머니위키",
    description: "퇴직연금은 만 55세부터 받을 수 있어요. 주택 구입·요양 등 부득이한 사유 5가지가 있으면 55세 전에도 인출할 수 있어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-수령-나이-55세-기준-조기-수령",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
